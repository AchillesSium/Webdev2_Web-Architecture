const path = require('path');
const fs = require('fs');
const app = require('connect')();

const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const cors = require('cors');
const { connectDB, disconnectDB } = require('./models/db');

connectDB();

const http = require('http');
const PORT = 8080;
const server = http.createServer(app);

// RabbitMQ
const receiveTask = require('./rabbit-utils/receiveTask');
const rabbitMQHost = "rapid-runner-rabbit:5672";
const completeQueueName = "Completed_Order_Queue";

// whiteList domains of cors
const whiteList = ['http://localhost:3000', 'http://127.0.0.1:8080']
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1){
      callback(null, true)
    }else{
      callback(new Error('Origin not allowed'))
    }
  }
}

// swaggerRouter Configuration
const options = {
  swaggerUI: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development'
};

// The swagger document (read it, build programmatically, fetch it from URL...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.load(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  app.use(cors());
  
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
    console.log('Your server is listening on (http://localhost:%d)', PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', PORT);
  });
});

const updateStatus = (msgBody) => {
  console.log(" [x] Get with '%s'", msgBody);
  var orderId = JSON.parse(msgBody)._id;
  console.log(id);
}

receiveTask.getTask(rabbitMQHost, completeQueueName, updateStatus);

