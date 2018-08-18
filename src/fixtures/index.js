var examples = require('./examples');
var users = require('./users');

users()
.then( () => {
    return examples();
})
.then( () => {
    process.exit();
});
