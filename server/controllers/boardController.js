var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = (function(){
    return {
        addQuestion: function(req,res){
            var newquestion = new Question(req.body);
            newquestion.User = req.session.user;
            newquestion.save(function(err,data){
                return res.json({success: true, question: data})
            })
        },
        getQuestions: function(req,res){
            Question.find({}).populate('user').exec(function(err,questions){
                if(err){
                    return res.json({success: false, error:err})
                } else {
                    return res.json({success: true, questions: questions})
                }
            })
        },
        getTargetQuestion: function(req,res){
            Question.findOne({_id: req.body.questionid}).populate('answers').populate('user').populate({
                    path: 'answers',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                }).exec(function(err, question){
                if(err){
                    return res.json({success: false, error:err});
                } else {
                    return res.json({success: true, question:question})
                }
            })
        },
        getTargetAnswers: function(req,res){
            Answer.find({question:req.body}).populate('user').exec(function(err,answers){
                if(err){
                    return res.json({success: false, error:err})
                } else {
                    return res.json({success: true, answers: answers})
                }
            })
        },
        addAnswer: function(req,res){
            Question.findOne({_id:req.body.questionid}, function(err,question){
                if(!question){
                    return res.json({success: false, message: 'question not found'})
                } else {
                    var newanswer = new Answer(req.body);
                    newanswer.question = question;
                    newanswer.user = req.session.user;
                    newanswer.likes = 0;
                    newanswer.save(function(err1,data){
                        if(err1){
                            return res.json({success: false, message: 'error saving answer to db'})
                        } else {
                            question.answers.push(newanswer);
                            question.save(function(err2,question1){
                                if(err2){
                                    return res.json({success: false, error:err2})
                                } else {
                                    return res.json({success: true, answer: data, question: question1})
                                }
                            })
                        }
                    })
                }
            })
        },
        addLike: function(req,res){
            Answer.findOne({_id:req.body.id}, function(err, answer){
                if(err){
                    return res.json({success: false, error: err})
                } else {
                    if(!answer.likes){
                        answer.likes = 0;
                    }
                    answer.likes ++;
                    answer.save(function(err1,data){
                        if(err1){
                            return res.json({success: false, error:err1})
                        } else {
                            return res.json({success: true, answer: answer})
                        }
                    })
                }
            })
        }
    }
})();