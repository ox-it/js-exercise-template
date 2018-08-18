var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalmongoose = require('passport-local-mongoose');

var Account = new Schema({
    email: { type: String, unique: true, required: true},
    name: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    status: {
        type: String,
        default: "approved",
        enum: [
            'pending',
            'approved',
        ]
    }
});

Account.plugin(passportLocalmongoose, {
    usernameField: "email",
    errorMessages: {
        MissingUsernameError: 'No email was given',
        UserExistsError: 'Email already in use'
    }
});

module.exports = mongoose.model('Account', Account);
