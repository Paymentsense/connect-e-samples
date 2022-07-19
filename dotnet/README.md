# Connect-e Samples .NET

Connect-e Samples .NET provides examples of how to get started integrating with connect-e using [.NET](https://dotnet.microsoft.com/) and [Angular](https://angular.io/).

For more information, please check [Connect-e](https://docs.connect.paymentsense.cloud/ConnectE/GettingStarted) documentation.

## Running

.NET API

This project is using .NET 6.0

1. Change setting file [appsettings.json](./Paymentsense.Connect-e.Api/appsettings.json)

2. Open and run [solution](./Paymentsense.Connect-e.sln)

Angular UI

1. Check and change if needed token url [tokenUrl](./angular/src/environments/environment.ts)

2. Check and change if needed client.js url [client.js](./angular/src/index.html)

3. Run [npm](https://nodejs.org/) commands

```bash
npm i
```

```bash
ng serve
```
4. Open your web browser and type [http://localhost:4200/angular](http://localhost:4200/angular)