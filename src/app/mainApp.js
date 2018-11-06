require('../public/stylesheets/style0.css');

var app = document.getElementById('app');
if(!app) {
    var body = document.getElementsByTagName('body')[0];
    var appElement = document.createElement('div');
    appElement.id = 'app'
    body.appendChild(appElement);
}
app.innerHTML = 'Welcome!';
