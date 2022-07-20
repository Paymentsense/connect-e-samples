using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Paymentsense.Connect_e.Api.Models;
using RestSharp;

namespace Paymentsense.Connect_e.Api
{
    public class CardPaymentsService : ICardPaymentsService
    {
        private readonly CardPaymentsOptions paymentOptions;
        public CardPaymentsService(IOptions<CardPaymentsOptions> options)
        {
            paymentOptions = options.Value;
        }

        public PaymentTokenResponse? AccessToken(string type)
        {
            var token = GetTokenRequest(); 
            token.transactionType = type;

            var tokenResponse = GetResponse<PaymentTokenResponse>(paymentOptions.ApiUrl + "/access-tokens", Method.Post, token);
            return tokenResponse;
        }

        public CrossReferencePaymentResponse? Collection(string id)
        {
            var paymentResponse = GetResponse<PaymentResponse>(paymentOptions.ApiUrl + "/payments/" + id, Method.Get);

            if(paymentResponse == null)
            {
                return null;
            }

            var token = GetTokenRequest();
            token.transactionType = "COLLECTION";
            token.crossReference = paymentResponse.crossReference;

            var tokenResponse = GetResponse<PaymentTokenResponse>(paymentOptions.ApiUrl + "/access-tokens", Method.Post, token);

            var crossReferencePaymentRequest = new CrossReferencePaymentRequest
            {
                crossReference = paymentResponse.crossReference
            };

            if(tokenResponse == null)
            {
                return null;
            }

            var crossReferencePaymentResponse = GetResponse<CrossReferencePaymentResponse>(paymentOptions.ApiUrl + "/cross-reference-payments/" + tokenResponse.id, Method.Post, crossReferencePaymentRequest);

            return crossReferencePaymentResponse;
        }

        private PaymentTokenRequest GetTokenRequest()
        {
            return new PaymentTokenRequest
            {
                merchantUrl = paymentOptions.MerchantUrl,
                currencyCode = paymentOptions.CurrencyCode,
                amount = paymentOptions.Amount,
                orderId = paymentOptions.OrderId
            };
        }

        private T? GetResponse<T>(string url, Method method, object? reqBody = null)
        {
            var options = new RestClientOptions(url)
            {
                // disable certificate validation
                RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
            };
            var client = new RestClient(options);
            var request = new RestRequest("", method);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + paymentOptions.ConnectEKey);

            if (reqBody != null)
            {
                var text = JsonConvert.SerializeObject(reqBody);
                request.AddParameter("application/json", text, ParameterType.RequestBody);
            }

            RestResponse response = client.Execute(request);
            if (response != null && response.Content != null)
            {
                var returnResponse = JsonConvert.DeserializeObject<T>(response.Content);
                return returnResponse;
            }
            return default;
        }
    }
}
