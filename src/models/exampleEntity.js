var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = require('./account');

var ExampleEntity = new Schema({
    title: {
        type: String,
        required: [true, 'A title is required'],
        minlength: [2, 'The title is too short']
    }
});

module.exports = mongoose.model('ExampleEntity', ExampleEntity);
