// https://expressjs.com/
// https://expressjs.com/en/4x/api.html
const express = require('express');
// https://expressjs.com/en/resources/middleware/morgan.html
const morgan = require('morgan');
const AccessToken = require('./access-token');

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
        };
        res.send(paymentConfig);
      } catch (error) {
        // Instance of `AccessTokenResponseError`.
        res.setHeader('Content-Type', 'application/json');
        res.status(error.status);
        res.send(JSON.stringify(error));
      }
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
