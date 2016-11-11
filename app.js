var express = require('express');
var bodyparser = require('body-parser'); //解析url
var morgan = require('morgan');//输出信息控制
var cookieparser = require('cookie-parser');//cookie
var session = require('express-session');//session
var path = require('path');
var mongoose = require('mongoose');//mongo数据库
var mongoStore = require('connect-mongo')(session);//session存mongo数据库

var app = express();
app.locals.moment = require('moment');//时间格式化

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/movie');

app.set('views','./app/views/pages')
app.set('view engine','jade');

app.use(cookieparser());
app.use(session({secret:'movie_node',
                 store:new mongoStore({
                     url:'mongodb://localhost:27017/movie',
                     collection:'sessions'
                 })
                }));
//开发辅助信息
if('development' === app.get('env'))
{
    app.set('showStackError',true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'app/images/')));
app.use(express.static(path.join(__dirname,'app/movies/')));

require('./config/routes.js')(app);

app.listen(3000);

console.log('server is runngin');


