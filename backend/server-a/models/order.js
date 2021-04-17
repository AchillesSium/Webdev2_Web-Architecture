const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new Schema({
    order_id: { 
        type: Number, 
        required: true 
    },
    sandwichId: { 
        type: Schema.Types.ObjectId,
        ref: "Sandwich", 
        required: true,
    },
    status: { 
        type: String, 
        required: true, 
        enum: {  
            ordered,
            received,
            inQueue,
            ready,
            failed,
        },
        default: received
    }
});


// Omit the version key when serialized to JSON
orderSchema.set('toJSON', { virtuals: false, versionKey: false });

orderSchema.plugin(autoIncrement, {order_id:'order_id_seq', inc_field: 'order_id'});
const Order = mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;