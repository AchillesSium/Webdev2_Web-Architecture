var utils = require('../utils/writer.js');
var userService = require('../services/user');

const createUser = (req, res, next) => {
  var body = req.swagger.params['body'].value;
  userService.createUser(body)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) =>{
      utils.writeJson(res, response);
    });
};

const deleteUser = (req, res, next) => {
  var username = req.swagger.params['username'].value;
  userService.deleteUser(username)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const getUserByName = (req, res, next) => {
  var username = req.swagger.params['username'].value;
  userService.getUserByName(username)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const loginUser = (req, res, next) => {
  var user = req.swagger.params['user'].value;
  userService.loginUser(user)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const logoutUser = (req, res, next) => {
  userService.logoutUser()
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const updateUser = (req, res, next) => {
  var username = req.swagger.params['username'].value;
  var body = req.swagger.params['body'].value;
  userService.updateUser(username,body)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

module.exports = { createUser, deleteUser, getUserByName, loginUser, logoutUser, updateUser }