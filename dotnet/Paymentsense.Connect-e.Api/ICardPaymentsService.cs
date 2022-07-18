using Paymentsense.Connect_e.Api.Models;

namespace Paymentsense.Connect_e.Api
{
    public interface ICardPaymentsService
    {
        PaymentTokenResponse? AccessToken(string type);
        CrossReferencePaymentResponse? Collection(string id);
    }
}