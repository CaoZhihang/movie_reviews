var User = require('../models/user.js');

//user logout get
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/');
}

//user signup post
exports.signup = function(req,res){
    var _user = req.body.user;
    var user = new User(_user);
    user.save(function(err,user){
        if(err)
        {
            console.log(err);
        }
        res.redirect('/admin/userlist');
    })
}

//user signin post
exports.signin = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.find({name:name},function(err,user){
        if(err)
        {
            console.log(err);
        }
        if(user.length > 0)
        {
            user[0].passwordMatch(password,function(err,isMatched){
                if(err)
                {
                    console.log(err);
                }
                if(!isMatched)
                {
                    console.log('not match !');
                    res.redirect('/');
                }
                else
                {
                    console.log('matched !');
                    req.session.user = user[0];
                    res.redirect('/');
                }
            })
        }
        else
        {
            console.log('name not exsist !');
            res.redirect('/');
        }
    });
}

//user list page
exports.userlist = function(req,res){
    User.fetch(function(err,users){
        if(err)
        {
            console.log(err);
        }

        res.render('userlist',{title:'用户列表',
                          users:users});
    });
}