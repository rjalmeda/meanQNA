app.factory('loginFactory', function($http){
    var factory = {};
    factory.login = function(user, callback){
        $http.post('/login', user).then(function(data){
            callback(data);
        })
    };
    factory.logout = function(callback){
        $http.get('/logout').then(function(data){
            callback(data);
        })
    };
    return factory;
})