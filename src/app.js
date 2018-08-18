var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var WindowsLiveStrategy = require('passport-windowslive').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var slashes = require('connect-slashes');

var oauthIds = require('./oauth.js');
mongoose.Promise = global.Promise;

var index = require('./routes/index');
var api = require('./routes/api/api');

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
app.use(passport.initialize());
app.use(passport.session());
// app.use(require('node-compass')({mode: 'expanded'}));
let staticpath = path.join(__dirname, 'public')

//serve uploaded files as static files
if(isRelease) {
    app.use(express.static('/srv/uploads'));
} else {
    app.use(express.static(path.join(__dirname, 'uploads')));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

//passport
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

//for google oauth
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        if(err) {
            done(err, null);
        } else {
            done(null, user);
        }
    });
});

let googleConfig = null;
switch (process.env.NODE_ENV) {
    case 'production':
        googleConfig = oauthIds.google.prod;
        break;
    case 'dev':
        googleConfig = oauthIds.google.dev;
        break;
    default:
        googleConfig = oauthIds.google.local;
        
}

var onAuthenticated = function (request, accessToken, refreshToken, profile, done) {
    Account.findOne({ oauthID: profile.id }, function (err, user) {
        if(err) {
            console.log(err);
            done(err, null);
        }
        if(!err && user !== null) {
            done(null, user);
        } else {
            //create user
            var email = profile.emails.find((email) => { return email.type === 'account'; });
            if(email == null) { console.log('unable to find email for user');}
            var user = new Account({
                oauthID: profile.id,
                email: email.value,
                name: profile.displayName,
                isAdmin: false,
                created: Date.now()
            });
            user.save(function (err) {
                if(err) {
                    console.log(err);
                    done(err, user);
                } else {
                    console.log('saving user');
                    done(null, user);
                }
            });
        }
    });
}

// uncomment to use google authentication
// passport.use(new GoogleStrategy({
//         clientID: googleConfig.clientId,
//         clientSecret: googleConfig.clientSecret,
//         callbackURL: googleConfig.callbackURL,
//         passReqToCallback: true
//     }, onAuthenticated
// ));

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

// uncomment to use windows live authentication
// passport.use(new WindowsLiveStrategy({
//         clientID: windowsConfig.applicationId,
//         clientSecret: windowsConfig.password,
//         callbackURL: windowsConfig.callbackURL,
//         passReqToCallback: true
//     },
//     onAuthenticated
// ));

app.get('/auth/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
]}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
);

app.get('/auth/microsoft', passport.authenticate('windowslive', { scope: [
    'wl.basic',
    'wl.offline_access',    //not sure yet whether we need this scope
    'wl.emails'
]}));

app.get('/auth/microsoft/callback', passport.authenticate('windowslive', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
)

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
