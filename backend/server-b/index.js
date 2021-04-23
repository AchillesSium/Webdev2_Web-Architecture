var sendTask = require('./rabbit-utils/sendTask');
var receiveTask = require('./rabbit-utils/receiveTask');

var orderQueueName = "order-queue";
var completeQueueName = "order-complete-queue";
var rabbitMQHost = "rapid-runner-rabbit:5672";

console.log("Server B going to start");
const sendReply = function(msgBody) {
  console.log("Message Body '%s'", msgBody);
  sendTask.addTask(rabbitMQHost, completeQueueName, msgBody);
};

receiveTask.getTask(rabbitMQHost, orderQueueName, sendReply);
