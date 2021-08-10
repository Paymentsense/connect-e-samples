const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

class AccessToken {
  constructor(envs) {
    this.envs = envs;
  }

  async fetch() {
    const req = new AccessTokenRequest(this.envs);
    console.info(
      'INFO: AccessToken.fetch - AccessTokenRequest',
      req.url,
      req.options,
    );

    return fetch(req.url, req.options)
      .then((response) => {
        console.info(
          'INFO: AccessToken.fetch - response',
          req.url,
          response.status,
          response.statusText,
        );
        if (response.status >= 400) {
          const error = new AccessTokenResponseError(
            req.url,
            response.status,
            response.statusText,
          );
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        console.info('INFO: AccessToken.fetch - data', data);
        return new AccessTokenResponse(data.id, data.expiresAt, req.orderId);
      })
      .catch((error) => {
        console.error('ERROR: AccessToken.fetch - error', error);
        throw error;
      });
  }
}

class AccessTokenRequest {
  constructor(envs) {
    this.gatewayUsername = envs.GATEWAY_USERNAME;
    this.gatewayPassword = envs.GATEWAY_PASSWORD;
    this.currencyCode = '826';
    this.amount = '100';
    this.transactionType = 'SALE';
    this.orderId = uuidv4();
    // this.orderId = "ORD00001";
    this.merchantUrl = envs.MERCHANT_URL;

    this.authorization = `Bearer ${envs.CONNECT_E_KEY}`;
    this.url = `https://${envs.API_URL}/v1/access-tokens`;
  }

  get options() {
    const headers = this.headers;
    const body = this.body;
    return {
      // withCredentials: true,
      // credentials: 'include',
      method: 'POST',
      headers,
      body,
    };
  }

  get headers() {
    return {
      Authorization: this.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  get body() {
    const gatewayUsername = this.gatewayUsername;
    const gatewayPassword = this.gatewayPassword;
    const currencyCode = this.currencyCode;
    const amount = this.amount;
    const transactionType = this.transactionType;
    const orderId = this.orderId;
    const merchantUrl = this.merchantUrl;

    return JSON.stringify({
      gatewayUsername,
      gatewayPassword,
      currencyCode,
      amount,
      transactionType,
      orderId,
      merchantUrl,
    });
  }
}

// AccessTokenResponse - Example:
//
// {
//   "id": "5f1tYtm-I5X_fB4lxkD7vQqtHGCykdguffB9GWySCr73qtAnz-g_3KQqxxAQVUyViMgmGbplcYVraRnYz7ro_5PkbD64WIalEgY788Q1yNbYTIIXmD6t",
//   "expiresAt": 1540457361
// }
class AccessTokenResponse {
  constructor(id, expiresAt, orderId) {
    this.id = id;
    this.expiresAt = expiresAt;
    this.orderId = orderId;
  }

  get paymentToken() {
    return this.id;
  }
}

// AccessTokenResponseError - Example:
//
// 400: Bad Request - The request has failed validation by our servers.
// 401: Unauthorized - There is an issue authenticating the request.
// 500: Internal Server Error - An error has occured while processing the request.
class AccessTokenResponseError {
  constructor(url, status, statusText) {
    this.url = url;
    this.status = status;
    this.statusText = statusText;
    this.message = `${url}: ${status}, ${statusText}`;
  }
}

module.exports = {
  AccessToken,
  AccessTokenRequest,
};
