const sendTask = require('../rabbit-utils/sendTask');
const rabbitMQHost = "rapid-runner-rabbit:5672";
const queueOfOrder = "Order_Queue";

const orderService = require('../services/order');

const getReceivedOrdersFromJSON = () => {

    // Get orders with "received" status
    orderService.getOrderByStatus("received").then((received_orders) => {
        console.log(received_orders);
        for(let i = 0; i < received_orders.length; i++) {
            let obj = received_orders[i];
            sendTask.addTask(rabbitMQHost, queueOfOrder, obj);
        }
    });

};

module.exports = { getReceivedOrdersFromJSON }
