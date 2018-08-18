var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var Example = require('../models/exampleEntity');

var errorHandler = (err) => {
    if(err) {
        console.warn('Error saving app fixture');
    } else {
        console.log('Successfully saved app fixture');
    }
}
mongoose.connect('mongodb://localhost/example')

var load = () => {
    console.log('Loading examples');
    return new Example({
        title: 'foo'
    }).save()
    .then( () => {
        return new Example({
            title: 'foo2'
        }).save();
    }).then( () => {
        return new Example({
            title: 'bar'
        }).save();
    })
}

module.exports = load;