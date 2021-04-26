const utils = require('../utils/writer.js');
const sandwichService = require('../services/sandwich');

const addSandwich = (req, res, next) => {
  var body = req.swagger.params['body'].value;
  Sandwich.addSandwich(body)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const deleteSandwich = (req, res, next) => {
  var sandwichId = req.swagger.params['sandwichId'].value;
  var api_key = req.swagger.params['api_key'].value;
  sandwichService.deleteSandwich(sandwichId,api_key)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const getSandwichById = (req, res, next) => {
  var sandwichId = req.swagger.params['sandwichId'].value;
  sandwichService.getSandwichById(sandwichId)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const getSandwiches = (req, res, next) => {
  sandwichService.getSandwiches()
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

const updateSandwich = (req, res, next) => {
  var sandwichId = req.swagger.params['sandwichId'].value;
  var body = req.swagger.params['body'].value;
  sandwichService.updateSandwich(sandwichId,body)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};

module.exports = { addSandwich, deleteSandwich, updateSandwich, getSandwichById, getSandwiches }