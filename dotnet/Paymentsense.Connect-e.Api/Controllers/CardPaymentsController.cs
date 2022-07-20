using Microsoft.AspNetCore.Mvc;
using Paymentsense.Connect_e.Api.Models;

namespace Paymentsense.Connect_e.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardPaymentsController : ControllerBase
    {
        private readonly ICardPaymentsService _cardPaymentsService;
        public CardPaymentsController(ICardPaymentsService cardPaymentsService)
        {
            _cardPaymentsService = cardPaymentsService;
        }

        [HttpGet]
        [Route("health-check")]
        public ActionResult HealthCheck()
        {
            return Ok();
        }

        [HttpGet]
        [Route("access-token/{type}")]
        public PaymentTokenResponse? AccessToken(string type)
        {
            var tokenResult = _cardPaymentsService.AccessToken(type);
            if(tokenResult == null)
            {
                return null;
            }
            return tokenResult;
        }

        [HttpGet]
        [Route("collection/{id}")]
        public CrossReferencePaymentResponse? Collection(string id)
        {
            var collectionResult = _cardPaymentsService.Collection(id);
            if (collectionResult == null)
            {
                return null;
            }
            return collectionResult;
        }
    }

}
