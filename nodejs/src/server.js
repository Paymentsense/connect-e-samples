// https://expressjs.com/
// https://expressjs.com/en/4x/api.html
const express = require('express');
// https://expressjs.com/en/resources/middleware/morgan.html
const morgan = require('morgan')
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
    app.use(morgan('dev'))
    app.use('/', express.static('./web'));

    app.get('/payment-config', async (req, res) => {
      const accessToken = new AccessToken(this.envs);
      try {
        const accessTokenResponse = await accessToken.fetch();
        const paymentConfig = {
          amount: "100",
          currencyCode: "826",
          paymentToken: accessTokenResponse.paymentToken,
        };
        res.send(paymentConfig);
      } catch (error) {
        throw error;
      }
    });

    app.get('/health-check', (req, res) => {
      res.send('/health-check');
    });

    // // app.get('/', (req, res) => {
    // //   res.send('/');
    // // });
    // app.get('/complete/:id', (req, res) => {
    //   res.send(req.params);
    // });
    // app.get('/checkout', (req, res) => {
    //   res.send('checkout');
    // });
    // app.post('/checkout-complete', (req, res) => {
    //   res.send('checkout-complete');
    // });
    // app.post('/refund', (req, res) => {
    //   res.send('/refund');
    // });
    // app.get('/recurring', (req, res) => {
    //   res.send('/recurring');
    // });
    // app.get('/standard-address', (req, res) => {
    //   res.send('/standard-address');
    // });
    // app.post('/webhooks', (req, res) => {
    //   res.send('/webhooks');
    // });
    // app.get('/webhooks', (req, res) => {
    //   res.send('/webhooks');
    // });

    // app.get('/api/access-token', (req, res) => {
    //   res.send('/api/access-token');
    // });
  }

  start(callback) {
    console.info(`initialising server at http://localhost:${this.envs.PORT}/`);
    this.server = this.app.listen(this.envs.PORT, callback);
  }

  printRoutes() {
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

module.exports = Server;
