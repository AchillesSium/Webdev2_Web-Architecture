const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: { 
        type: BigInt64Array, 
        required: true 
    },
    sandwichId: { 
        type: BigInt64Array, 
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
        }
    }
});


// Omit the version key when serialized to JSON
orderSchema.set('toJSON', { virtuals: false, versionKey: false });

const Order = new mongoose.model('Order', orderSchema);
module.exports = { Order };