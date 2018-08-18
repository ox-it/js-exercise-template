import React from 'react';
import ReactDOM from 'react-dom';

require('../public/stylesheets/style0.css');

var app = document.getElementById('app2');
if(!app) {
    //create if needed
    var body = document.getElementsByTagName('body')[0];
    var appElement = document.createElement('div');
    appElement.id = 'app2'
    appElement.innerHTML = 'wellcome !!!';
    body.appendChild(appElement);
}

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
);