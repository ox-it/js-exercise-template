require('../public/stylesheets/style0.css');
import Vue from 'vue';
    
var app = document.getElementById('vue');
var appElement = document.createElement('div');
appElement.id = 'vue-id';
appElement.innerHTML = '<p>{{ message }}</p>';
app.appendChild(appElement);

new Vue({
  el: '#vue',
  data: {
    message: 'Hello Vue.js!'
  }
})