using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;

namespace shop
{
    public class Shop
    {
        [FunctionName("CreateCheckout")]
        public async Task<IActionResult> CreateCheckout(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "CreateCheckout/{productCode}")]
            HttpRequest req, string productCode, 
            ILogger log)
        {
           
            StripeConfiguration.ApiKey =
                System.Environment.GetEnvironmentVariable("StripeKey", EnvironmentVariableTarget.Process);

            var shopConfig = ShopConfigProvider.Get();
            var product = shopConfig.Products.First(el => el.Code == productCode);

            var domain = "https://radekmaziarka.pl";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = product.PriceId,
                        Quantity = 1,
                        TaxRates = new List<string>() { shopConfig.TaxId }
                    },
                },
                TaxIdCollection = new SessionTaxIdCollectionOptions() { Enabled = true },
                BillingAddressCollection = "required",
                Mode = "payment",
                SuccessUrl = domain + "/sukces/",
                CancelUrl = domain + "/",
                AllowPromotionCodes = true
            };
            var service = new SessionService();
            Session session = service.Create(options);

            return new RedirectResult(session.Url, false);
        }

        private static async Task SendEmail(string clientEmail, string productName, string productAccessUrl)
        {
            var senderEmail = "radek@radekmaziarka.pl";
            var token = Environment.GetEnvironmentVariable("MailSenderKey", EnvironmentVariableTarget.Process);
            
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("X-Requested-With","XMLHttpRequest");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var data = new
            {
                from = new { email = senderEmail, name= "Radek Maziarka"},
                to = new[] { new {email = clientEmail} },
                template_id = "0r83ql32nxz4zw1j",
                subject = "Zakup ze strony radekmaziarka.pl",
                variables = new
                {
                    substitutions = new
                    {
                        email = clientEmail,
                        substitutions = new []
                        {
                             new { var = "productName", value = productName },
                             new { var = "productAccessUrl", value = productAccessUrl },       
                        }
                    }
                }
            };
            
            var response = await client.PostAsync("https://api.mailersend.com/v1/email", 
            new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                throw new Exception(responseContent);
            }
        }

        [FunctionName("HandleSuccess")]
        public async Task<IActionResult> HandleSuccess(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequest req,
            ILogger log)
        {
            string secret = Environment.GetEnvironmentVariable("StripeWebHookSecret", EnvironmentVariableTarget.Process);
            var json = await new StreamReader(req.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    req.Headers["Stripe-Signature"],
                    secret
                );

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;
                    
                    var options = new SessionListLineItemsOptions
                    {
                        Limit = 5,
                    };
                    
                    var service = new SessionService();
                    StripeList<LineItem> lineItems = service.ListLineItems(session.Id, options);
                    var lineItem = lineItems.First();
                    var priceId = lineItem.Price.Id;
                    var products = ShopConfigProvider.Get().Products;
                    var product = products.First(el => el.PriceId == priceId);
                    
                    var clientEmail = session.CustomerDetails.Email;

                    await SendEmail(clientEmail, product.Name, product.Link);
                    log.Log(LogLevel.Information, "Succeeded with sending a file for {email}", clientEmail);
                }

                return new OkResult();
            }
            catch (Exception e)
            {
                log.Log(LogLevel.Error, e.Message);
                return new BadRequestResult();
            }
        }


        [FunctionName("SendInvoice")]
        public static async Task<IActionResult> SendInvoice(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequest req,
            ILogger log)
        {
            var senderEmail = "radek@radekmaziarka.pl";
            var token = Environment.GetEnvironmentVariable("FakturowniaKey", EnvironmentVariableTarget.Process);
            
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Accept","application/json");
            var data = new
            {
                api_token = token,
                invoice= new {
                    kind="vat",
                    number = (string) null,
                    sell_date= DateTime.Now.ToString("yyyy-MM-dd"),
                    issue_date= DateTime.Now.ToString("yyyy-MM-dd"),
                    payment_to= DateTime.Now.ToString("yyyy-MM-dd"),
                    seller_name= "RadSoft Radosław Maziarka",
                    seller_tax_no= "6772364277",
                    seller_post_code = "54-234",
                    seller_street = "Białowieska 97/12",
                    seller_city = "Wrocław",
                    buyer_name= "Bio ActiW",
                    buyer_tax_no= "8722420595",
                    buyer_post_code= "39-204",
                    buyer_city= "Żyraków",
                    buyer_street= "Zawierzbie 80",
                    buyer_country= "PL",
                    buyer_email = "maziarka.radoslaw@outlook.com",
                    buyer_override=true,
                    positions = new object[] {
                        new { name= "Produkt A1", tax=23, total_price_gross=10.23, quantity=1 }
                    }
                }
            };
            
            var createInvoiceResponse = await client.PostAsync("https://radekmaziarka.fakturownia.pl/invoices.json", 
                new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"));

            
            if (!createInvoiceResponse.IsSuccessStatusCode)
            {
                return new BadRequestResult();
            }
            var createInvoiceResponseContent = await createInvoiceResponse.Content.ReadAsStringAsync();
            var invoice = JsonConvert.DeserializeAnonymousType(createInvoiceResponseContent, new { Id = 1 });
            
            
            var sendEmailResponse = await client.PostAsync(
                $"https://radekmaziarka.fakturownia.pl/invoices/{invoice.Id}/send_by_email.json?api_token={token}", null);


            var sendEmailResponseContent = await sendEmailResponse.Content.ReadAsStringAsync();
            
            return new OkResult();
        }

        private static string GenerateUrlToAccessResource(string fileName)
        {
            string azureStorageKey = Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process);
            BlobClient blobClient = new BlobClient(azureStorageKey, "shop-items", fileName);

            BlobSasBuilder sasBuilder = new BlobSasBuilder()
            {
                BlobContainerName = blobClient.BlobContainerName,
                BlobName = blobClient.Name,
                Resource = "b",
                ExpiresOn = DateTimeOffset.UtcNow.AddDays(28)
            };

            sasBuilder.SetPermissions(BlobSasPermissions.Read);
            Uri sasUri = blobClient.GenerateSasUri(sasBuilder);
            
            return sasUri.AbsoluteUri;
        }
    }
}
