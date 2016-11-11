var index = require('../app/controllers/index.js');
var movie = require('../app/controllers/movie.js');
var user = require('../app/controllers/user.js');

module.exports = function(app){
//pre handle 
app.use(function(req,res,next){
    var _user = req.session.user;

    app.locals.user = _user;

    return next();
})

//index page
app.get('/',index.index)

//movie detail page
app.get('/movie/:id',movie.detail)
//admin save page
app.get('/admin/movie/new',movie.save)
//admin update page
app.get('/admin/update/:id',movie.update)
//movie save post
app.post('/admin/movie/new',movie.new)
//movie delete 
app.delete('/admin/list',movie.delete)

//list page
app.get('/admin/list',movie.list);
//user logout get
app.get('/user/logout',user.logout)
//user signup post
app.post('/user/signup',user.signup);
//user signin post
app.post('/user/signin',user.signin);
//user list page
app.get('/admin/userlist',user.userlist);


}