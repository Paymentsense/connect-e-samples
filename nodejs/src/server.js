const fetch = require('node-fetch');
// https://expressjs.com/
// https://expressjs.com/en/4x/api.html
const express = require('express');
// https://expressjs.com/en/resources/middleware/morgan.html
const morgan = require('morgan');
const { AccessToken, AccessTokenRequest } = require('./access-token');

class Server {
  constructor(envs) {
    this.envs = envs;
    this.server = null;
    this.app = express();
    this.addRoutes();
  }

  addRoutes() {
    const app = this.app;

    // logger
    app.use(morgan('dev'));
    // website
    app.use('/', express.static('./web'));

    app.get('/payment-config', async (req, res) => {
      const accessToken = new AccessToken(this.envs);
      try {
        const accessTokenResponse = await accessToken.fetch();
        const paymentConfig = {
          amount: '100',
          currencyCode: '826',
          paymentToken: accessTokenResponse.paymentToken,
          // orderId: accessTokenResponse.orderId,
        };
        console.info(
          '/payment-config - paymentConfig',
          JSON.stringify(paymentConfig),
        );
        res.send(paymentConfig);
      } catch (error) {
        // Instance of `AccessTokenResponseError`.
        res.setHeader('Content-Type', 'application/json');
        res.status(error.status);
        res.send(JSON.stringify(error));
      }
    });

    app.get('/payment-confirm/:id', async (req, res) => {
      console.info('INFO: /payment-confirm/:id - req.params', req.params);

      const accessTokenRequest = new AccessTokenRequest(this.envs);
      const headers = accessTokenRequest.headers;
      const id = req.params.id;
      const url = `https://${this.envs.API_URL}/v1/payments/${id}`;

      fetch(url, {
        method: 'GET',
        headers,
      })
        .then((response) => {
          console.info(
            'INFO: /payment-confirm/:id - response',
            url,
            response.status,
            response.statusText,
          );
          if (response.status >= 400) {
            return new Error(`${url} - failed`, JSON.stringify(response));
          }
          return response.json();
        })
        .then((data) => {
          console.info(
            'INFO: /payment-confirm/:id - data',
            JSON.stringify(data),
          );
          res.send(data);
          // return data;
          // return new AccessTokenResponse(data.id, data.expiresAt);
        })
        .catch((error) => {
          console.error('ERROR: /payment-confirm/:id - error', error);
          res.setHeader('Content-Type', 'application/json');
          res.status(error.status);
          res.send(JSON.stringify(error));
          // throw error;
        });
    });

    app.get('/health-check', (req, res) => {
      res.send('/health-check');
    });
  }

  start(callback) {
    console.info(`initialising server at http://localhost:${this.envs.PORT}/`);
    this.server = this.app.listen(this.envs.PORT, callback);
  }

  printRoutes() {
    if (this.envs.VERBOSE) {
      console.log();
      console.log('-------');
      console.log('Routes:');
      this.app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
          console.log(r.route.path);
        }
      });
      console.log('-------');
      console.log();
    }
  }
}

module.exports = Server;
