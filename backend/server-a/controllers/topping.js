const utils = require('../utils/writer.js');
const toppingService = require('../services/topping');

const addSandwich = (req, res, next) => {
    var body = req.swagger.params['body'].value;
    toppingService.addTopping(body)
        .then((response) => {
            utils.writeJson(res, response);
        })
        .catch((response) => {
            utils.writeJson(res, response);
        });
};

module.exports = { addSandwich };