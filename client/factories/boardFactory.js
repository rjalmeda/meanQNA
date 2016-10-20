app.factory('boardFactory', function($http){
    var factory = {};
    factory.checkUser = function(callback){
        $http.get('/checkUser').then(function(data){
            callback(data);
        })
    };
    
    factory.addQuestion = function(question, callback){
        $http.post('/addQuestion', question).then(function(data){
            callback(data);
        })
    };
    
    factory.getQuestions = function(callback){
        $http.get('/getQuestions').then(function(data){
            callback(data);
        })
    };
    
    factory.getTargetQuestion = function(question, callback){
        $http.post('/getTargetQuestion/',question).then(function(data){
            callback(data);
        })
    };
    
    factory.getTargetAnswers = function(question, callback){
        $http.post('/getTargetAnswers', question).then(function(data){
            callback(data);
        })
    };
    
    factory.addAnswer = function(answer, callback){
        $http.post('/addAnswer', answer).then(function(data){
            callback(data);
        })
    };
    
    factory.addLike = function(answer, callback){
        $http.post('/addLike', answer).then(function(data){
            callback(data);
        })
    };
    return factory;
})