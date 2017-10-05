// app.js is the main JS file which you should define your Angular module
console.log('Das Bemo ist in Betrieb!');

angular
  .module('bemoApp', ['ui.router', 'satellizer', 'ngResource', 'ngAnimate']);
