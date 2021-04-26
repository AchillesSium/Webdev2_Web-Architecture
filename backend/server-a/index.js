const path = require('path');
const fs = require('fs');
const app = require('connect')();

const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const cors = require('cors');
const { connectDB, disconnectDB } = require('./models/db');

connectDB();

const http = require('http');
var Order = require('./services/order');

const PORT = 8080;
const server = http.createServer(app);

const options = {
  swaggerUI: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development'
};

const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.load(spec);

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  server.listen(PORT, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', PORT, PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', PORT);
  });
});

