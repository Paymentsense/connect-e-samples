namespace Paymentsense.Connect_e.Api.Models
{
    public class PaymentTokenRequest
    {
        public string merchantUrl { get; set; }
        public string currencyCode { get; set; }
        public string amount { get; set; }
        public string transactionType { get; set; }
        public string transactionSource { get; set; }
        public string orderId { get; set; }
        public string merchantTransactionId { get; set; }
        public string orderDescription { get; set; }
        public string userAgent { get; set; }
        public string userEmailAddress { get; set; }
        public string userPhoneNumber { get; set; }
        public string userIpAddress { get; set; }
        public string userAddress1 { get; set; }
        public string userAddress2 { get; set; }
        public string userAddress3 { get; set; }
        public string userAddress4 { get; set; }
        public string userCity { get; set; }
        public string userState { get; set; }
        public string userPostcode { get; set; }
        public string userCountryCode { get; set; }
        public ShippingDetails shippingDetails { get; set; }
        public bool newTransaction { get; set; }
        public string crossReference { get; set; }
        public string webHookUrl { get; set; }
        public bool waitPreExecute { get; set; }
    }
}
