const Topping = require('../models/Topping');

/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
const addTopping = (body) => {
    return new Promise((resolve, reject) => {
        const new_topping = new Topping.Topping({name: body.name});
        new_topping.save().then((body) => {
            resolve(body);
        }).catch((err) => {
            reject(err);
        });
    });
};


/**
 * Get a topping. Empty if no topping is found.
 *
 * returns object
 **/
const getToppingByName = (name) => {
    return new Promise(function(resolve, reject) {
        Topping.Topping.find({name: name}, (err, topping) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(topping);
        });
    });
};


/**
 * Get all toppings. Empty array if no topping is found.
 *
 * returns an array
 **/
const getToppings = () => {
    return new Promise(function(resolve, reject) {
        Topping.Topping.find((err, toppings) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(toppings);
        });
    });
};

module.exports = { addTopping, getToppingByName, getToppings }