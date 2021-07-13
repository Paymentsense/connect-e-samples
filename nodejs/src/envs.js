const _ = require('lodash');
const DEFAULT_PORT = 8080;

class Envs {
  constructor(API_URL, WEB_URL, CONNECT_E_KEY, PORT, GATEWAY_USERNAME, GATEWAY_PASSWORD, MERCHANT_URL, WEBHOOK_URL) {
    // E.g., 'e.test.connect.paymentsense.cloud'
    this.API_URL = API_URL;
    // E.g., 'web.e.test.connect.paymentsense.cloud'
    this.WEB_URL = WEB_URL;
    this.CONNECT_E_KEY = CONNECT_E_KEY;
    // Defaults to 8080, if undefined.
    this.PORT = PORT;
    this.GATEWAY_USERNAME = GATEWAY_USERNAME;
    this.GATEWAY_PASSWORD = GATEWAY_PASSWORD;
    this.MERCHANT_URL = MERCHANT_URL;
    this.WEBHOOK_URL = WEBHOOK_URL;
  }

  toString() {
    return JSON.stringify(this);
  }

  static parse() {
    console.info("INFO", "validating Environmental Variables");

    if (_.isNil(process.env) || _.isEmpty(process.env)) {
      throw Error("Environmental Variable 'process.env' not defined");
    }
    if (_.isNil(process.env.API_URL) || _.isEmpty(process.env.API_URL)) {
      throw Error("Environmental Variable 'API_URL' not defined");
    }
    if (_.isNil(process.env.WEB_URL)) {
      throw Error("Environmental Variable 'WEB_URL' not defined");
    }
    if (_.isNil(process.env.CONNECT_E_KEY) || _.isEmpty(process.env.CONNECT_E_KEY)) {
      throw Error("Environmental Variable 'CONNECT_E_KEY' not defined");
    }
    if (_.isNil(process.env.PORT) || _.isEmpty(process.env.PORT)) {
      console.info(`Environmental Variable 'PORT' not defined, defaulting to '${DEFAULT_PORT}'`)
    }
    // if (_.isNil(process.env.GATEWAY_USERNAME) || _.isEmpty(process.env.GATEWAY_USERNAME)) {
    //   throw Error("Environmental Variable 'GATEWAY_USERNAME' not defined");
    // }
    // if (_.isNil(process.env.GATEWAY_PASSWORD) || _.isEmpty(process.env.GATEWAY_PASSWORD)) {
    //   throw Error("Environmental Variable 'GATEWAY_PASSWORD' not defined");
    // }
    if (_.isNil(process.env.MERCHANT_URL)) {
      throw Error("Environmental Variable 'MERCHANT_URL' not defined");
    }
    if (_.isNil(process.env.WEBHOOK_URL)) {
      throw Error("Environmental Variable 'WEBHOOK_URL' not defined");
    }

    const envs = new Envs(
      process.env.API_URL,
      process.env.WEB_URL,
      process.env.CONNECT_E_KEY,
      process.env.PORT || DEFAULT_PORT,
      process.env.GATEWAY_USERNAME,
      process.env.GATEWAY_PASSWORD,
      process.env.MERCHANT_URL,
      process.env.WEBHOOK_URL,
    );
    return envs;
  }
}

module.exports = Envs;
