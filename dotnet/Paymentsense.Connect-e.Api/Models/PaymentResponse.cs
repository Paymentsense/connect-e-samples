namespace Paymentsense.Connect_e.Api.Models
{
    public class PaymentResponse
    {
        public string transactionDateTime { get; set; }
        public int statusCode { get; set; }
        public string message { get; set; }
        public string crossReference { get; set; }
        public string authCode { get; set; }
        public string cardNumber { get; set; }
        public string expiryDate { get; set; }
        public string cardType { get; set; }
        public string cardName { get; set; }
        public Address billingAddress { get; set; }
        public ShippingDetails shippingDetails { get; set; }
        public string userEmailAddress { get; set; }
    }
}
