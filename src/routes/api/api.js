var express = require('express');
var router = express.Router();

var example_entity = require('./example_entity');
var user = require('./user');

router.use('/example_entity', example_entity);
router.use('/user', user);

module.exports = router;