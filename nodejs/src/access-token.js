const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');

class AccessToken {
  constructor(envs) {
    this.envs = envs;
  }

  async fetch() {
    const url = this.accessTokenUrl();
    const accessTokenRequest = new AccessTokenRequestBody(this.envs);
    const authorization = `Bearer ${this.envs.CONNECT_E_KEY}`
    const headers = {
      'Authorization': authorization,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const body = accessTokenRequest.stringify();

    return fetch(url, {
      // withCredentials: true,
      // credentials: 'include',
      method: 'POST',
      headers,
      body,
    }).then((response) => {
      // console.info("INFO: AccessToken.fetch.then", url, response.status, response.statusText);
      if (response.status >= 400) {
        const error = new AccessTokenResponseError(url, response.status, response.statusText);
        console.error("ERROR: AccessToken.fetch - headers", headers);
        console.error("ERROR: AccessToken.fetch - body", body);
        console.error("ERROR: AccessToken.fetch - error", error);
        throw error;
      }
      return response.json();
    }).then((data) => {
      console.info("INFO: AccessToken.fetch - data", data);
      return new AccessTokenResponse(data.id, data.expiresAt);
    }).catch((error) => {
      throw error;
    });
  }

  accessTokenUrl() {
    const url = `https://${this.envs.API_URL}/v1/access-tokens`;
    // console.info("INFO: AccessToken.url - url", url);
    return url;
  }
}

// AccessTokenRequestBody - Example:
//
// {
//   "gatewayUsername": "YOUR_USER_NAME",
//   "gatewayPassword": "YOUR_PASSWORD",
//   "currencyCode": "826",
//   "amount": "100",
//   "transactionType": "SALE",
//   "orderId": "ORD00001",
//   "orderDescription": "Example description.",
//   "userAgent": "string",
//   "userEmailAddress": "user@exmaple.com",
//   "userPhoneNumber": "55512345",
//   "userIpAddress": "192.168.0.0.1",
//   "userAddress1": "1 Example st",
//   "userAddress2": "Angel",
//   "userAddress3": "string",
//   "userAddress4": "string",
//   "userCity": "London",
//   "userState": "string",
//   "userPostcode": "N19PS",
//   "userCountryCode": "826",
//   "newTransaction": false,
//   "crossReference": "1234567890ABC"
// }
class AccessTokenRequestBody {
  constructor(envs) {
    this.gatewayUsername = envs.GATEWAY_USERNAME;
    this.gatewayPassword = envs.GATEWAY_PASSWORD;
    this.currencyCode = "826";
    this.amount = "100";
    this.transactionType = "SALE";
    this.orderId = uuidv4();
    // this.orderId = "ORD00001";
  }

  stringify() {
    const gatewayUsername = this.gatewayUsername;
    const gatewayPassword = this.gatewayPassword;
    const currencyCode = this.currencyCode;
    const amount = this.amount;
    const transactionType = this.transactionType;
    const orderId = this.orderId;

    return JSON.stringify({
      gatewayUsername,
      gatewayPassword,
      currencyCode,
      amount,
      transactionType,
      orderId,
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
  constructor(id, expiresAt) {
    this.id = id;
    this.expiresAt = expiresAt;
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

module.exports = AccessToken;
