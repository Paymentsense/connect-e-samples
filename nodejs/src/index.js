const Envs = require('./envs');
const Server = require('./server');

process.on('uncaughtException', (error) => {
  console.error('ERROR: index.js - uncaught error', error);
  process.exit(1); // mandatory (as per the Node.js docs)
});

let envs = null;
try {
  envs = Envs.parse();
} catch (error) {
  console.error('ERROR: index.js - failed to initialise server', error);
  process.exit(1);
}
console.info('INFO: index.js - initialised server config', envs.toString());

const server = new Server(envs);
const callback = () => {
  console.info(
    `INFO: index.js - initialised server at http://localhost:${envs.PORT}/`,
  );
  server.printRoutes();
};
server.start(callback);
