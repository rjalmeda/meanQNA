var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = (function(){
    return {
        login: function(req,res){
            User.findOne({name: req.body.name}, function(err, user){
                if(err){
                    return res.json({success: false, error: err});
                } else if (user){
                    req.session.user = user;
                    req.session.save();
                    return res.json({success: true, user: user});
                } else {
                    var newuser = new User(req.body);
                    newuser.save(function(err1,data){
                        if(err1){
                            return res.json({success: false, error: err1})
                        } else {
                            req.session.user = data;
                            req.session.save();
                            return res.json({success: true, user: data})
                        }
                    })
                }
            })
        },
        logout: function(req,res){
            req.session.destroy();
            console.log('logout result', req.session);
            return res.json({success: true, message: 'user logged out'})
        },
        checkUser: function(req,res){
            if(req.session.user){
                return res.json({success: true, user: req.session.user})
            } else {
                return res.json({success: false})
            }
        },
    }
})();