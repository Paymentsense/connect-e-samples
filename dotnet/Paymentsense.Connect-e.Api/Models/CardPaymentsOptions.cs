namespace Paymentsense.Connect_e.Api.Models
{
    public class CardPaymentsOptions
    {
        public string ApiUrl { get; set; }
        public string MerchantUrl { get; set; }
        public string CurrencyCode { get; set; }
        public string Amount { get; set; }
        public string ConnectEKey { get; set; }
        public string OrderId { get; set; }
    }
}
