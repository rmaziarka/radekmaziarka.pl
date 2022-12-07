using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
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
    public static class HttpExample
    {
        [FunctionName("HttpExample")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            StripeConfiguration.ApiKey = 
                System.Environment.GetEnvironmentVariable("StripeKey", EnvironmentVariableTarget.Process);;
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
                        TaxRates = new List<string>(){"txr_1MCTsqFecJIMSlsEX3hADzIp"}
                    },
                },
                TaxIdCollection = new SessionTaxIdCollectionOptions(){ Enabled = true},
                InvoiceCreation = new SessionInvoiceCreationOptions() {Enabled = true},
                BillingAddressCollection = "auto",
                Mode = "payment",
                SuccessUrl = domain + "/success.html",
                CancelUrl = domain + "/cancel.html",
            };
            var service = new SessionService();
            Session session = service.Create(options);

            return new RedirectResult(session.Url, false);
        }
    }
}
