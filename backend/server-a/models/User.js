const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(autoIncrement, {user_id:'user_id_seq', inc_field: 'user_id'});
const User = mongoose.model('Topping', userSchema);

exports.userSchema = userSchema;
exports.User = User;