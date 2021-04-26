var sendTask = require('./rabbit-utils/sendTask');
var receiveTask = require('./rabbit-utils/receiveTask');

var orderQueueName = "Order_Queue";
var completeQueueName = "Completed_Order_Queue";
var rabbitMQHost = "rapid-runner-rabbit:5672";

console.log("Server B going to start");
const sendReply = function(msgBody) {
  console.log("Message Body '%s'", msgBody);
  sendTask.addTask(rabbitMQHost, completeQueueName, msgBody);
};

receiveTask.getTask(rabbitMQHost, orderQueueName, sendReply);
