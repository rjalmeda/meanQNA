app.controller('boardController', function($scope, $location, $routeParams, boardFactory, loginFactory){
    var checkUser = function(){
        boardFactory.checkUser(function(data){
            if(!data.data.success){
                alert('please login');
                return $location.url('/login');
            }
        })
    };
    checkUser();
    
    var getQuestions = function(){
        boardFactory.getQuestions(function(data){
            if(!data.data.success){
                return alert('something happened retrieving questions')
            } else {
                $scope.questions = data.data.questions;
            };
        })
    };
    getQuestions();
    
    var getTargetQuestion = function(){
        if($routeParams.questionid){
            boardFactory.getTargetQuestion($routeParams, function(data){
                if(data.data.success){
                    $scope.targetQuestion = data.data.question;
                    console.log(data.data.question);
                    boardFactory.getTargetAnswers(data.data.question, function(data1){
                        if(data1.data.answers){
                            $scope.targetAnswers = data1.data.answers
                        }
                    })
                }
            })
        }
    };
    getTargetQuestion();
       
    
    $scope.logout = function(){
        loginFactory.logout(function(data){
            checkUser();
        })
    };
    
    
    
    $scope.addQuestion = function(){
        if (!$scope.question){
            return
        } else if (!$scope.question.question){
            return alert('question must not be blank');
        } else if ($scope.question.question.length < 10){
            return alert('question must be at least 10 characters');
        }
        boardFactory.addQuestion($scope.question, function(data){
            if(data.data.success){
                $location.url('/board');
            } else {
                $scope.question = {};
                return alert('Error!')
            }
        })
    };
    
    $scope.addAnswer = function(){
        if (!$scope.answer){
            return
        } else if (!$scope.answer.answer){
            return alert('answer must not blank');
        } else if ($scope.answer.answer.length < 5){
            return alert('answer must be at least 5 characters');
        }
        $scope.answer.questionid = $scope.targetQuestion._id;
        boardFactory.addAnswer($scope.answer, function(data){
            if(data.data.success){
                $location.url(`/show/${$scope.targetQuestion._id}`);
            } else {
                $scope.answer = {};
                return alert('Error with Answer');
            }
        })
    };
    
    $scope.addLike = function(answerid){
        boardFactory.addLike({id: answerid}, function(data){
            console.log(data);
            if(data.data.success){
                getTargetQuestion();
            }
        })
    }
})

