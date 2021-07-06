// const http = require('http');
const Envs = require('./src/envs');
const Server = require('./src/server');

process.on('uncaughtException', error => {
  console.error('nodejs/index.js - uncaught error', error)
  process.exit(1) // mandatory (as per the Node.js docs)
})

let envs = null
try {
  envs = Envs.parse();
} catch (error) {
  console.error('error initialising server', error);
  process.exit(1);
}
console.info("INFO", "initialised server config", envs.toString());

const server = new Server(envs);
const callback = () => {
  console.log(`initialised server at http://localhost:${envs.PORT}/`);
  server.printRoutes();
};
server.start(callback);
