const orderService = require('../services/order');
const utils = require('../utils/writer');

// POST a new order path /order
const addOrder = (req, res, next) => {
    var order = req.swagger.params['order'].value;
    orderService.addOrder(order)
        .then((response) => {
            utils.writeJson(res, response);
        })
        .catch((response) => {
            utils.writeJson(res, response);
        });
};

// GET order by id path /order/{orderId}
const getOrderById = (req, res, next) => {
    var orderId = req.swagger.params['orderId'].value;
    orderService.getOrderById(orderId)
        .then((response) => {
        utils.writeJson(res, response);
        })
        .catch((response) => {
        utils.writeJson(res, response);
        });
};

// GET a list of all orders path /order
const getOrders = (req, res, next) => {
    orderService.getOrders()
        .then((response) => {
        utils.writeJson(res, response);
        })
        .catch((error) => {
        utils.writeJson(res, {
            error: error
        }, 400);
        });
}

module.exports = { addOrder, getOrderById, getOrders }