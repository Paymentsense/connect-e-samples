package com.paymentsense.sample;

import com.google.gson.Gson;
import com.paymentsense.sample.model.AccessTokenRequest;
import com.paymentsense.sample.model.AccessTokenResponse;
import com.paymentsense.sample.model.CrossReferencePaymentRequest;
import com.paymentsense.sample.model.CrossReferencePaymentResponse;
import com.paymentsense.sample.model.PaymentResponse;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

public class Server {
  private static Logger log = LoggerFactory.getLogger(Server.class);
  private static final Gson gson = new Gson();

  public static void main(String[] args) {
    Dotenv dotenv = Dotenv.load();
    log.info("API_URL: " + dotenv.get("API_URL"));
    log.info("WEB_URL: " + dotenv.get("WEB_URL"));
    log.info("CONNECT_E_KEY: " + dotenv.get("CONNECT_E_KEY"));
    log.info("PORT: " + dotenv.get("PORT"));
    log.info("GATEWAY_USERNAME: " + dotenv.get("GATEWAY_USERNAME"));
    log.info("GATEWAY_PASSWORD: " + dotenv.get("GATEWAY_PASSWORD"));
    log.info("MERCHANT_URL: " + dotenv.get("MERCHANT_URL"));
    log.info("WEBHOOK_URL: " + dotenv.get("WEBHOOK_URL"));

    port(Integer.parseInt(dotenv.get("PORT")));

    staticFiles.location("/web");

    ConnectEClient client = new ConnectEClient(dotenv.get("API_URL"), dotenv.get("CONNECT_E_KEY"));

    post("/api/access-tokens", (req, res) -> {
      log.info("access-tokens request");
      AccessTokenRequest accessTokenRequest = gson.fromJson(req.body(), AccessTokenRequest.class);
      accessTokenRequest.setMerchantUrl(dotenv.get("MERCHANT_URL"));
      AccessTokenResponse accessTokenResponse = client.createAccessToken(accessTokenRequest);
      return gson.toJson(accessTokenResponse);
    });

    // "application/json"
    get("/api/payments/:id", (req, res) -> {
      log.info("payments api for id " + req.params(":id"));
      PaymentResponse paymentResponse = client.retrievePaymentInfo(req.params(":id"));
      return gson.toJson(paymentResponse);
    });

    post("/api/cross-reference-payments/:id", (req, res) -> {
      log.info("cross-reference-payments api for id " + req.params(":id"));
      CrossReferencePaymentRequest crossReferencePaymentRequest = gson.fromJson(req.body(), CrossReferencePaymentRequest.class);
      CrossReferencePaymentResponse crossReferencePaymentResponse = client.executeCrossReferencePayment(req.params(":id"), crossReferencePaymentRequest);
      return gson.toJson(crossReferencePaymentResponse);
    });
  }
}
