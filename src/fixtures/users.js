var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Account = require('../models/account');

var errorHandler = (err, account) => {
    if(err) {
        console.warn('Error saving user fixture');
        return;
    } else {
        console.log('Successfully saved user fixture');
        return;
    }
}

var registerHandler = (err, account) => {
    account.save(errorHandler());
}

var addAccount = (data) => {
    const password = data.password;
    delete data.password;
    return new Promise ( (resolve, reject) => {
        Account.register(new Account(data), password, function (err, account) {
            if (err) {
                reject(err);
            } else {
                resolve(account);
            }
        })
    })
}

//returns a promise which resolves when all accounts have loaded
var load = () => {
    console.log('Adding user accounts fixtures');
    return addAccount({
        "oauthID": 109914956892714420000,
        "email": "andyhaith@gmail.com",
        "name": "Andy Haith",
        "username": "ahaith",
        "password": "1234",
        "isAdmin": true,
    })
    .then(() => {
        return addAccount({
            "oauthID": 1234567890,
            "email": "markdoub@outlook.com",
            "name": "Markos Ntoumpanakis",
            "username": "markdoub",
            "password": "1234",
            "isAdmin": true,
        })
    })
    .then(() => {
        return addAccount({
            "oauthID": 1234567891,
            "email": "ted@example.com",
            "name": "Ted",
            "username": "ted",
            "password": "1234",
            "isAdmin": true,
        })
    })
    ;
};

module.exports = load;
