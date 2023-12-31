const Sandwich = require('../models/Sandwich');

/**
 * Add a new sandwich to the store.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 *
 **/
const addSandwich = (body) => {
    return new Promise((resolve, reject) => {
        const new_sandwich = new Sandwich.Sandwich(body);
        new_sandwich.save().then(() => {
            resolve(body);
        }).catch((err) => {
            console.log('error while sandwich save');
            reject(err)
        });
    });
};

/**
 * Deletes a sandwich
 *
 * sandwichId Long Sandwich id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
const deleteSandwich = (sandwichId,api_key) => {
    return new Promise((resolve, reject) => {
        resolve();
    });
};


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
const getSandwichById = (sandwichId) => {
    return new Promise((resolve, reject) => {
        var examples = {};
        examples['application/json'] = {
            "name" : "my-super-sandwich",
            "toppings" : [ {
                "name" : "name",
                "order_id" : 6
            }, {
                "name" : "name",
                "order_id" : 6
            } ],
            "order_id" : 0,
            "breadType" : "oat"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
const getSandwiches = () => {
    return new Promise(function(resolve, reject) {
        Sandwich.Sandwich.find((err, sandwiches) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(sandwiches);
        });
    });
};


/**
 * Updates a sandwich in the store with JSON in body
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * 
 **/
const updateSandwich = (sandwichId,body) => {
    return new Promise(function(resolve, reject) {
        resolve();
    });
};

module.exports = { addSandwich, getSandwichById, getSandwiches, deleteSandwich, updateSandwich }