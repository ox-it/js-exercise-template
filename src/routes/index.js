var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      user: req.user,
      title: 'Home',
      is_dev: process.env.NODE_ENV !== 'production'
  });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
});

module.exports = router;
