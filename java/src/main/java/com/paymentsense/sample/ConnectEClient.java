package com.paymentsense.sample;

import com.google.gson.Gson;
import com.paymentsense.sample.model.AccessTokenRequest;
import com.paymentsense.sample.model.AccessTokenResponse;
import com.paymentsense.sample.model.CrossReferencePaymentRequest;
import com.paymentsense.sample.model.CrossReferencePaymentResponse;
import com.paymentsense.sample.model.PaymentResponse;
import java.io.IOException;
import okio.Buffer;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Basic client implementation for key Paymentsense API functions
 */
public class ConnectEClient {

  final class AuthInterceptor implements Interceptor {
    @Override public Response intercept(Interceptor.Chain chain) throws IOException {
      Request req = chain.request().newBuilder()
        .addHeader("Authorization", "Bearer " + jwt)
        .addHeader("Content-Type", "application/json")
        .build();
      return chain.proceed(req);
    }
  }

  private static Logger log = LoggerFactory.getLogger(ConnectEClient.class);
  private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

  private static final String ACCESS_TOKENS_API = "/v1/access-tokens";
  private static final String PAYMENTS_API = "/v1/payments/"; // note trailing slash required
  private static final String CROSS_REFERENCE_PAYMENTS_API = "/v1/cross-reference-payments/"; // note trailing slash required

  private final String jwt;
  private final String baseUrl;

  private final OkHttpClient client = new OkHttpClient.Builder().addInterceptor(new AuthInterceptor()).build();
  private final Gson gson = new Gson();

  public ConnectEClient(String apiUrl, String key) {
    log.info("Created PaymentsenseClient");
    this.jwt = key;
    this.baseUrl = apiUrl;
  }

  private Response runRequest(Request request) throws IOException {
    log.info(request.toString());
    if (request.body() != null) {
      log.info(stringifyRequestBody(request));
    }
    Response response = client.newCall(request).execute();
    if (!response.isSuccessful()) {
      log.error("ConnectE Client error, response code " + response.code());
      log.error(response.message());
      throw new RuntimeException("ConnectE Client error: " + response.code());
    }
    return response;
  }

  private String stringifyRequestBody(Request request) {
    try {
        Request copy = request.newBuilder().build();
        Buffer buffer = new Buffer();
        copy.body().writeTo(buffer);
        return buffer.readUtf8();
    } catch (IOException e) {
        return "did not work";
    }
  }

  /**
   * Access Token
   * Endpoint: /v1/access-tokens
   * Operation: POST
   * Description: create a token representing the transaction details for processing
   */
  public AccessTokenResponse createAccessToken(AccessTokenRequest accessTokenRequest) throws IOException {
    log.info("createAccessToken");
    RequestBody body = RequestBody.create(gson.toJson(accessTokenRequest), JSON);
    Response response = runRequest(new Request.Builder()
      .url(baseUrl + ACCESS_TOKENS_API)
      .post(body)
      .build());

    return gson.fromJson(response.body().string(), AccessTokenResponse.class);
  }

  /**
   * Payment
   * Endpoint: /v1/payments/{id}
   * Operation: GET
   * Description: verify the payment status based on the given id
   */
  public PaymentResponse retrievePaymentInfo(String paymentId) throws IOException {
    log.info("retrievePaymentInfo");
    Response response = runRequest(new Request.Builder()
      .url(baseUrl + PAYMENTS_API + paymentId)
      .get()
      .build());
    return gson.fromJson(response.body().string(), PaymentResponse.class);
  }

  /**
   * Cross Reference Payment
   * Endpoint: /v1/cross-reference-payments/{id}
   * Operation: POST
   * Description: execute a transaction using the cross reference from a previous transaction
   */
  public CrossReferencePaymentResponse executeCrossReferencePayment(String accessToken, CrossReferencePaymentRequest crossReferencePaymentRequest) throws IOException {
    log.info("executeCrossReferencePayment");
    RequestBody body = RequestBody.create(gson.toJson(crossReferencePaymentRequest), JSON);
    Response response = runRequest(new Request.Builder()
      .url(baseUrl + CROSS_REFERENCE_PAYMENTS_API + accessToken)
      .post(body)
      .build());
    final String tmp = response.body().string();
    log.info("XREF Response Body");
    log.info(tmp);
    return gson.fromJson(tmp, CrossReferencePaymentResponse.class);
  }
}
