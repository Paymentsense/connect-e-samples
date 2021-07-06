# Connect-e Samples Node.js

## Prerequisites

Tested on:

* Linux.
* macOS.

## Configure Environment

Strictly speaking, `MERCHANT_URL` and `WEBHOOK_URL` are not required, so just leave them as undefined:

```sh
cat <<EOF > .env-test
API_URL=e.test.connect.paymentsense.cloud
WEB_URL=web.e.test.connect.paymentsense.cloud
CONNECT_E_KEY=YOUR_CONNECT_E_KEY
PORT=8080
GATEWAY_USERNAME=YOUR_GATEWAY_USERNAME
GATEWAY_PASSWORD=YOUR_GATEWAY_PASSWORD
MERCHANT_URL=
WEBHOOK_URL=
EOF
```

### Docker and Docker Compose

### Docker

```sh
make build-docker run-docker
```

### Run Natively

```sh
make
```

## References

See:

* <https://docs.connect.paymentsense.cloud/ConnectE/Standard>.
* <https://docs.connect.paymentsense.cloud/ConnectE/RestApi>.
