var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var slashes = require('connect-slashes');

var oauthIds = require('./oauth.js');
mongoose.Promise = global.Promise;

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

var isRelease = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev';

if(!isRelease) {
    var bundle = require('./bundle.js');
    bundle();
    
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer();
    
    //proxy to webpack's server for all built assets
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8061'
        });
    });
    
    // It is important to catch any errors from the proxy or the
    // server will crash. An example of this is connecting to the
    // server when webpack is bundling
    proxy.on('error', function(e) {
        console.log('Could not connect to proxy, please try again...');
    });
    app.use(logger('dev'));
}
if(true) {
    //add mongo-express
    var mongo_express = require('mongo-express/lib/middleware');
    var mongo_express_config = require('./mongo_express_config');

    app.use('/mongo_express', mongo_express(mongo_express_config))
    //set up proxy for webpack assets
    
} else {
    //production specific config here
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'exampleapp',
    cookie:{maxAge:1000 * 60 * 60 * 24}, //last for a day
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// app.use(require('node-compass')({mode: 'expanded'}));
let staticpath = path.join(__dirname, 'public')

//serve uploaded files as static files
if(isRelease) {
    app.use(express.static('/srv/uploads'));
} else {
    app.use(express.static(path.join(__dirname, 'uploads')));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


let windowsConfig = null;
switch (process.env.NODE_ENV) {
    case 'production':
        windowsConfig = oauthIds.windows.prod;
        break;
    case 'dev':
        windowsConfig = oauthIds.windows.dev;
        break;
    default:
        windowsConfig = oauthIds.windows.local;
        
}

//mongoose
mongoose.connect('mongodb://localhost/example');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
