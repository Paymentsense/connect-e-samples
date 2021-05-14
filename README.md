# Connect-e Demo

Connect-e Demo provides examples of how to get started integrating with connect-e. It is currently available in [Go](https://golang.org/), [Angular](https://angular.io/).

For more information, please check [Connect-e](https://docs.connect.paymentsense.cloud/ConnectE/GettingStarted) documentation.

## Features

1. Standard Payment
1. Checkout Payment
1. Recurring Payment
1. Refund Payment
1. Void/Reversal Payment

## Running a container locally

You can run connect-e demo inside a Docker container. This approach doesn't require you to install any dependencies other than Docker Desktop on Windows and Mac, and Docker Compose on Linux.

1. Create docker-compose file

```bash
version: "3.8"
services:
  demo:
    build: .
    ports:
      - "8080:8080"
    environment:
        CONNECT_E_KEY: PUT HERE THE JWT TOKEN
        API_URL: PUT HERE THE ENV API URL FOR EXAMPLE (https://e.test.connect.paymentsense.cloud/v1)
        WEB_URL: PUT HERE THE ENV WEB URL FOR EXAMPLE (https://web.e.test.connect.paymentsense.cloud)
```

1. Build the docker image

```bash
docker-compose build
```

1. Run the built image

```bash
docker-compose up
```

> NOTE: You can run both commands at once with docker-compose up --build.

1. Verify that the service is working.

Open your web browser and type http://localhost:8080 in your navigation bar, This opens a local instance of the connect-e standard payment page.

### Cleanup

To stop Docker Compose, on your terminal window, press **Ctrl + C**. 

To remove the produced images run:

```console
docker-compose rm
```
For more information see the [Docker Compose
documentation](https://docs.docker.com/compose/gettingstarted/).