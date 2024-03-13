const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        // required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        // match: [RegExp, 'Email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // validate: {
        //     validator: function () {

        //     }
        // }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postCode: {
        type: String,
    },
    votedFor: {
        type: Array,
    },
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
