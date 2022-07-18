namespace Paymentsense.Connect_e.Api.Models
{
    public class CrossReferencePaymentResponse
    {
        public int statusCode { get; set; }
        public string authCode { get; set; }
        public string message { get; set; }
        public string paReq { get; set; }
        public string acsUrl { get; set; }
        public string md { get; set; }
        public string stepUpUrl { get; set; }
        public string jwt { get; set; }
    }
}
