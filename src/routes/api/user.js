var express = require('express');
var router = express.Router();
var Account = require('../../models/account');

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    if(typeof(req.user) === 'undefined' || !req.user.isAdmin) {
        res.status(403).json({'error': {message: 'Not authorised..'}});
    } else {
        next()
    }
})

/* GET all users */
router.get('/all', function (req, res) {
    Account.find({}, function (err, users) {
        if(err) {
            res.json({error:err});
        } else {
            res.json({ status: 'success', users: users });
        }
    });
});

/* DELETE a user */
router.delete('/delete/:user_email', function(req, res) {
    Account.findOneAndRemove({ email: req.params.user_email }, function(err, user) {
        if(err) {
            res.json({error:err});
        } else if(user) {
            res.json({ status: 'success', user: user });
        } else {
            res.json({'error':'User not found'});
        }
    });
});

/* ADD a user */
router.post('/add', function(req, res) {
    if(!req.body || Object.keys(req.body).length === 0) {
        res.json({ status: 'error', 'error': 'no body'});
        return; }
    var data = Object.assign({}, req.body);
    const password = data.password;
    delete data.password;
    Account.register(new Account(data), password, function (err, account) {
        if(err) {
            res.json({error:err});
        } else {
            res.json({ status: 'success', user: {
                email: account.email,
                isAdmin: account.isAdmin,
                name: account.name,
                status: account.status,
                _id: account._id
            } });
        }
    });
});

/* POST update a user */
router.post('/update', function (req, res) {
    if(!req.body || Object.keys(req.body).length === 0) {
        res.json({ status: 'error', 'error': 'no body'});
        return; }
    const id = req.body._id;
    var data = Object.assign({}, req.body);
    const password = data.password
    delete data._id;
    delete data.password;
    Account.findById(id)
    .then( (account) => {
        Object.assign( account, data );
        return account.save()
    }).then( (account) => {
        return new Promise ( (resolve, reject) => {
            if (password.length>0) {
                account.setPassword(password, function(err, er2) {
                    account.save();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(account);
                    }
                })
            } else {
                resolve(account);
            }
        })
    })
    .then( (account) => {
        account.setPassword
    })
    .then( (result) => {
        res.json({ status: 'success', user:result });
    })
    .catch( (err) => {
        res.json({ status: 'error', error:err });
    });
});

module.exports = router;
