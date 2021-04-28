#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
var Order = require('../services/order');

module.exports.addTask = function(rabbitHost, queueName, order){
  amqp.connect('amqp://' + rabbitHost)
  .then(function(c) {
    c.createConfirmChannel()
    .then(function(ch) {
      ch.assertQueue(queueName, {durable: true});
      ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
      function(err, ok) {
        console.log("Order came from JSON to RabbitMQ");
        let order_id = order._id;
        let status;
        if (err !== null){
            console.warn(new Date(), 'Message nacked!');
            status = "failed";
        }
        else {
            console.log(new Date(), 'Message acked');
            status = "inQueue";
        }

        Order.updateOrder(order_id, {status: status})
            .then(function (response) {
                console.log("Order has been updated", response);
            }).catch(function (error) {
                console.log("Update order failed", error);
            });
      });
    });
  }).catch((error) => {
  console.log(error,'Promise error');
  });
}
