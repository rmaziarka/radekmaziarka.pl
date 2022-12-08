using System;
using System.Collections.Generic;
using System.IO;
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
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;

namespace shop
{
    public static class Shop
    {
        [FunctionName("CreateCheckout")]
        public static async Task<IActionResult> CreateCheckout(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequest req,
            ILogger log)
        {
           
            StripeConfiguration.ApiKey =
                System.Environment.GetEnvironmentVariable("StripeKey", EnvironmentVariableTarget.Process);

            var domain = "https://radekmaziarka.pl";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        Price = "price_1MCTs3FecJIMSlsE6OHzQ1ff",
                        Quantity = 1,
                        TaxRates = new List<string>() { "txr_1MCTsqFecJIMSlsEX3hADzIp" }
                    },
                },
                TaxIdCollection = new SessionTaxIdCollectionOptions() { Enabled = true },
                InvoiceCreation = new SessionInvoiceCreationOptions() { Enabled = true },
                BillingAddressCollection = "auto",
                Mode = "payment",
                SuccessUrl = domain + "/success.html",
                CancelUrl = domain + "/",
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
                subject = "test",
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
        public static async Task<IActionResult> HandleSuccess(
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

                // Handle the checkout.session.completed event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;


                    var fileName = "Jak zacząć ze zdalnym Event Stormingiem - Radek Maziarka";
                    var fileNameWithExt = "Jak zacząć ze zdalnym Event Stormingiem - Radek Maziarka.pdf";
                    var urlToResource = GenerateUrlToAccessResource(fileNameWithExt);
                    var clientEmail = session.CustomerDetails.Email;

                    await SendEmail(clientEmail, fileName, urlToResource);
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
