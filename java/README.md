# paymentsense/connect-e-samples

A Java project using Spark Java that demonstrates Paymentsense Connect-E transactions: 
- https://docs.connect.paymentsense.cloud/ConnectE/GettingStarted

## Local development
Building should not require any local prerequisites.  Project runs in a local Docker container.

Project environment variables can be changed in the `.env` file at the root of the project.

```
$ docker-compose build
```

```
$ docker-compose up
```

- http://localhost:8080 (default port)