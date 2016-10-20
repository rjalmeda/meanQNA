var loginController = require('./../controllers/loginController');
var boardController = require('./../controllers/boardController');
module.exports = function(app){
    app.post('/login', function(req,res){
        loginController.login(req,res);
    });
    app.get('/logout', function(req,res){
        loginController.logout(req,res);
    });
    app.get('/checkUser', function(req,res){
        loginController.checkUser(req,res);
    });
    app.post('/addQuestion', function(req,res){
        boardController.addQuestion(req,res);
    });
    app.get('/getQuestions', function(req,res){
        boardController.getQuestions(req,res);
    });
    app.post('/getTargetQuestion', function(req,res){
        boardController.getTargetQuestion(req,res);
    });
    app.post('/getTargetAnswers', function(req,res){
        boardController.getTargetAnswers(req,res);
    });
    app.post('/addAnswer', function(req,res){
        boardController.addAnswer(req,res);
    });
    app.post('/addLike', function(req,res){
        boardController.addLike(req,res);
    })
};