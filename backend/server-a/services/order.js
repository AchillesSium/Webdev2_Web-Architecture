const Order = require('../models/Order');
const Sandwich = require('../models/Sandwich');
let order_enque = require('../utils/addOrderToRabbit.js');


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
const addOrder = (order) => {
    console.log(order);
return new Promise((resolve, reject) => {
    Sandwich.Sandwich.findOne({sandwich_id: order.sandwichId}, (err, found_order) => {
        if (err) {
            console.log(err);
            return;
        }
        if (isEmpty(found_order)) {
            reject('No sandwich found for given ID...')
        } else {
            const new_order = new Order.Order({sandwichId: found_order._id, status: order.status});
            new_order.save().then((added_order) => {
                console.log('yes');
                resolve({sandwichId: found_order.sandwich_id, order_id: added_order.order_id, status: added_order.status});
                order_enque.getReceivedOrdersFromJSON();
            }).catch((err) => {
                console.log('no');
                reject(err);
            });
        }
    });
});
};
  
const isEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  
/**
 * Find an order by its ID
 * ID must be positive integers
 *
 * orderId of sandwich that needs to be fetched
 * returns Order
 **/
const getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
        Order.Order.findOne({order_id: orderId}, (err, found_order) => {
            if (err) {
                console.log(err)
                return;
            }

            if (isEmpty(found_order)) {
                reject('No sandwich found for given ID...');
            } else {
                console.log(found_order);
                console.log('search by id');
                Sandwich.Sandwich.findOne({_id: found_order.sandwichId}, (err, found_sandwich) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    if(!isEmpty(found_sandwich)){
                        resolve({order_id: found_order.order_id, sandwichId: found_sandwich.sandwich_id, status: found_order.status});
                    } else {
                        reject('No sandwich found for given ID...');
                    }
                });
            }
        });
    });
};
  
  
/**
 * Find all order by a status
 * status must be string
 *
 * returns array of Orders
 **/
const getOrderByStatus = (status) => {
    return new Promise((resolve, reject) => {
        Order.Order.find({status: status}, (err, orders) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!orders.length) {
                reject('No sandwich found for '+status+' status...');
            } else {
                resolve(orders);
            }
        });
    });
};

  
/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
const getOrders = () => {
    return new Promise((resolve, reject) => {
        
        Order.Order.find(function (err, orders) {
            if (err) {
                reject(err);
                return;
            }
            resolve(orders);
        });
    });
};
  
/**
 * Update an order
 *
 * Order of orderId will be updated
 * new data will be in the 'body' parameter
 **/
const updateOrder = (orderId, body) => {
    console.log('update order from A');
    console.log(body);
    return new Promise((resolve, reject) => {
        Order.Order.findOneAndUpdate({_id: orderId}, body, {new: true}, (err, order) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(body);
        })
    });
};

module.exports = { addOrder, isEmpty, getOrderById, getOrders, updateOrder, getOrderByStatus };