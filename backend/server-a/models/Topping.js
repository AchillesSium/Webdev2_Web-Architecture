const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const toppingSchema = new mongoose.Schema({
    topping_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: Number
    }
});
//
toppingSchema.plugin(AutoIncrement, {topping_id:'topping_id_seq', inc_field: 'topping_id'});
const Topping = mongoose.model('Topping', toppingSchema);

exports.toppingSchema = toppingSchema;
exports.Topping = Topping;