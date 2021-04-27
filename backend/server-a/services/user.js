const User = require('../models/User');
/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
const createUser = (body) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
const getUserByName = (username) => {
  return new Promise((resolve, reject) => {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "order_id" : 0,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 *
 * user User The user for login
 * returns String
 **/
const loginUser = (user) => {
  return new Promise((resolve, reject) => {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
const updateUser = (username,body) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

module.exports = { createUser, deleteUser, getUserByName, loginUser, logoutUser, updateUser }