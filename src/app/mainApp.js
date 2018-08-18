import angular from 'angular';
require('../public/stylesheets/style0.css');

var app = document.getElementById('app2');
if(!app) {
    var body = document.getElementsByTagName('body')[0];
    body.setAttribute('ng-app', 'myApp');
    var appElement = document.createElement('div');
    appElement.id = 'app2';
    appElement.setAttribute("ng-controller", "MyCtrl");
    appElement.innerHTML = 'Hello, {{name}}!';
    body.appendChild(appElement);
}

// <body ng-app='myApp' binds to the app being created below.
var app = angular.module('myApp', []);

// Register MyController object to this app
app.controller('MyCtrl', ['$scope', MyController]);    

// We define a simple controller constructor.
function MyController($scope) {
    $scope.name = 'World!!!!';
}
