var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .when('/board', {
        templateUrl: 'partials/board.html',
        controller: 'boardController'
    })
    .when('/newQuestion', {
        templateUrl: 'partials/newquestion.html',
        controller: 'boardController'
    })
    .when('/show/:questionid', {
        templateUrl: 'partials/question.html',
        controller: 'boardController'
    })
    .when('/answer/:questionid', {
        templateUrl: 'partials/newanswer.html',
        controller: 'boardController'
    })
    .otherwise({
        redirectTo: '/login'
    })
})