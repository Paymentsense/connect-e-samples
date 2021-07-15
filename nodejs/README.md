# Connect-e Samples Node.js

Connect-e Samples Go provides examples of how to get started integrating with connect-e using [Node.js](https://nodejs.org/).

For more information, please check [Connect-e](https://docs.connect.paymentsense.cloud/ConnectE/GettingStarted) documentation.

## Run Natively

### Prerequisites

Tested on:

* Linux.
* macOS.

```sh
make
```

### Docker and Docker Compose

### Docker Compose

```sh
docker-compose up --build --force-recreate
```

Add `--remove-orphans` if necessary.

### Docker

```sh
make build-docker run-docker
```

## Sample Run

![demo!](./demo.png "demo")

```sh
$ docker-compose up --build --force-recreate --remove-orphans
Removing orphan container "d1f0831a69ca_nodejs"
Building connect-e-samples-nodejs
[+] Building 13.0s (9/9) FINISHED                                                                       
 => [internal] load build definition from Dockerfile                                               0.1s
 => => transferring dockerfile: 36B                                                                0.0s
 => [internal] load .dockerignore                                                                  0.1s
 => => transferring context: 34B                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:14.17-alpine                               0.7s
 => [1/4] FROM docker.io/library/node:14.17-alpine@sha256:fb6cb918cc72869bd625940f42a7d8ae035c4e7  0.0s
 => [internal] load build context                                                                  0.1s
 => => transferring context: 2.48kB                                                                0.0s
 => CACHED [2/4] WORKDIR /connect-e-samples/nodejs                                                 0.0s
 => [3/4] COPY . .                                                                                 0.2s
 => [4/4] RUN yarn install --frozen-lockfile                                                       9.8s
 => exporting to image                                                                             1.9s 
 => => exporting layers                                                                            1.8s 
 => => writing image sha256:471616f2bba5413b585b1082dfce5bf2dba9157f5684f67df9aca549257c7e98       0.0s 
 => => naming to docker.io/connect-e-samples/nodejs:latest                                         0.0s 
                                                                                                        
Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them    
Creating connect-e-samples-nodejs ... done
Attaching to connect-e-samples-nodejs
connect-e-samples-nodejs    | yarn run v1.22.5
connect-e-samples-nodejs    | $ export $(cat env | xargs) && node src/index.js
connect-e-samples-nodejs    | INFO: Envs - Environmental Variable 'GATEWAY_USERNAME' not defined, ignoring ...
connect-e-samples-nodejs    | INFO: Envs - Environmental Variable 'GATEWAY_PASSWORD' not defined, ignoring ...
connect-e-samples-nodejs    | INFO: Envs - Environmental Variable 'VERBOSE' not defined, defaulting to 'false'
connect-e-samples-nodejs    | INFO: index.js - initialised server config {"API_URL":"e.test.connect.paymentsense.cloud","WEB_URL":"web.e.test.connect.paymentsense.cloud","CONNECT_E_KEY":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vZS50ZXN0LmNvbm5lY3QucGF5bWVudHNlbnNlLmNsb3VkIiwiZXhwIjoyMzgzMDQ4NDAxLCJpYXQiOjE2MjYxODQ0MDEsInN1YiI6ImNvbm5lY3QtZS1kZXZAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwiYXBpS2V5IjoiMTM3ODQyOGMtYTMxNC00NTA5LWFjYTEtNmRhY2EzNGNiM2QyIiwiZW1haWwiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.IKX_Kou8grA5_UTkiC4wREq8yYL4gj1W9UG6lXArlm_DQiv1eL26kMfsbzN3dfUWO-H7BJHs8zMX-EN2fXocNq16aUTrdLHtSczVSLbt8kizHcVsOMYotW3syw897vpXJBDe2xWihKMBrr6P1uBFKnx_bDeMR67wvE3-5XIh_zV9hteFneuN9QmEW-QyGEJ9RpyKwrpGKU60SPYM1WO_6L72CgkxSATLwHThsEnUQCsZoOZc058lHzjyVww0T_y7QLYsooXQo2WJy5TIunE3xjf6srZnE6yeQu_0wouUJ_m64y9lmlUNXGzAzNvmgfnDZ1IqhWdfVDiIE6ZOa__H4w","PORT":"8080","GATEWAY_USERNAME":"","GATEWAY_PASSWORD":"","MERCHANT_URL":"www.example.com","WEBHOOK_URL":"","VERBOSE":false}
connect-e-samples-nodejs    | initialising server at http://localhost:8080/
connect-e-samples-nodejs    | INFO: index.js - initialised server at http://localhost:8080/
connect-e-samples-nodejs    | GET / 304 11.807 ms - -
connect-e-samples-nodejs    | GET /connect-e.js 304 2.587 ms - -
connect-e-samples-nodejs    | INFO: AccessToken.fetch - AccessTokenRequest https://e.test.connect.paymentsense.cloud/v1/access-tokens {
connect-e-samples-nodejs    |   method: 'POST',
connect-e-samples-nodejs    |   headers: {
connect-e-samples-nodejs    |     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vZS50ZXN0LmNvbm5lY3QucGF5bWVudHNlbnNlLmNsb3VkIiwiZXhwIjoyMzgzMDQ4NDAxLCJpYXQiOjE2MjYxODQ0MDEsInN1YiI6ImNvbm5lY3QtZS1kZXZAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwiYXBpS2V5IjoiMTM3ODQyOGMtYTMxNC00NTA5LWFjYTEtNmRhY2EzNGNiM2QyIiwiZW1haWwiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.IKX_Kou8grA5_UTkiC4wREq8yYL4gj1W9UG6lXArlm_DQiv1eL26kMfsbzN3dfUWO-H7BJHs8zMX-EN2fXocNq16aUTrdLHtSczVSLbt8kizHcVsOMYotW3syw897vpXJBDe2xWihKMBrr6P1uBFKnx_bDeMR67wvE3-5XIh_zV9hteFneuN9QmEW-QyGEJ9RpyKwrpGKU60SPYM1WO_6L72CgkxSATLwHThsEnUQCsZoOZc058lHzjyVww0T_y7QLYsooXQo2WJy5TIunE3xjf6srZnE6yeQu_0wouUJ_m64y9lmlUNXGzAzNvmgfnDZ1IqhWdfVDiIE6ZOa__H4w',
connect-e-samples-nodejs    |     Accept: 'application/json',
connect-e-samples-nodejs    |     'Content-Type': 'application/json'
connect-e-samples-nodejs    |   },
connect-e-samples-nodejs    |   body: '{"gatewayUsername":"","gatewayPassword":"","currencyCode":"826","amount":"100","transactionType":"SALE","orderId":"c1b09aec-8e24-4e17-8fd9-ad64f7566951","merchantUrl":"www.example.com"}'
connect-e-samples-nodejs    | }
connect-e-samples-nodejs    | INFO: AccessToken.fetch - response https://e.test.connect.paymentsense.cloud/v1/access-tokens 200 OK
connect-e-samples-nodejs    | INFO: AccessToken.fetch - data {
connect-e-samples-nodejs    |   id: 'iw2SOJ-31xiwfLWCkDh1HaDy4zSPucSrpvnA3hr112ZkIyEkZboyp2sRTkjnjpmwJWQh46ARQz2QlsTQpSZcVOUpAPimI32Q_0Q8EBLN5t4s9C_z7vyg',
connect-e-samples-nodejs    |   expiresAt: 1626340377
connect-e-samples-nodejs    | }
connect-e-samples-nodejs    | /payment-config - paymentConfig {"amount":"100","currencyCode":"826","paymentToken":"iw2SOJ-31xiwfLWCkDh1HaDy4zSPucSrpvnA3hr112ZkIyEkZboyp2sRTkjnjpmwJWQh46ARQz2QlsTQpSZcVOUpAPimI32Q_0Q8EBLN5t4s9C_z7vyg"}
connect-e-samples-nodejs    | GET /payment-config 200 718.148 ms - 171
connect-e-samples-nodejs    | INFO: /payment-confirm/:id - req.params {
connect-e-samples-nodejs    |   id: 'iw2SOJ-31xiwfLWCkDh1HaDy4zSPucSrpvnA3hr112ZkIyEkZboyp2sRTkjnjpmwJWQh46ARQz2QlsTQpSZcVOUpAPimI32Q_0Q8EBLN5t4s9C_z7vyg'
connect-e-samples-nodejs    | }
connect-e-samples-nodejs    | INFO: /payment-confirm/:id - response https://e.test.connect.paymentsense.cloud/v1/payments/iw2SOJ-31xiwfLWCkDh1HaDy4zSPucSrpvnA3hr112ZkIyEkZboyp2sRTkjnjpmwJWQh46ARQz2QlsTQpSZcVOUpAPimI32Q_0Q8EBLN5t4s9C_z7vyg 200 OK
connect-e-samples-nodejs    | INFO: /payment-confirm/:id - data {"transactionDateTime":"2021-07-15 08:46:01.491677 +0000 UTC","statusCode":0,"message":"AuthCode: 1","crossReference":"6263387629156936804006","authCode":"1","cardNumber":"520000******0056","expiryDate":"2024-12-31","cardType":"MASTERCARD","cardName":"John Watson","billingAddress":{"address1":"","address2":"","address3":"","address4":"","city":"","state":"","postcode":"","countryCode":""},"shippingDetails":{"Name":"","Address":{"address1":"","address2":"","address3":"","address4":"","city":"","state":"","postcode":"","countryCode":""}},"userEmailAddress":""}
connect-e-samples-nodejs    | GET /payment-confirm/iw2SOJ-31xiwfLWCkDh1HaDy4zSPucSrpvnA3hr112ZkIyEkZboyp2sRTkjnjpmwJWQh46ARQz2QlsTQpSZcVOUpAPimI32Q_0Q8EBLN5t4s9C_z7vyg 200 550.015 ms - 564
...
```


## References

See:

* <https://docs.connect.paymentsense.cloud/ConnectE/Standard>.
* <https://docs.connect.paymentsense.cloud/ConnectE/RestApi>.
