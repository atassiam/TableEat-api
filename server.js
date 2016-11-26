//Import required files
var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//===============PASSPORT===============
// Passport session setup.
passport.serializeUser(function(user, done) {
    console.log("serializing " + user.username);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    done(null, obj);
});
// Use the LocalStrategy within Passport to login/”signin” users.
passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        funct.localAuth(username, password)
            .then(function (user) {
                if (user) {
                    console.log("LOGGED IN AS: " + user.username);
                    req.session.success = 'You are successfully logged in ' + user.username + '!';
                    done(null, user);
                }
                if (!user) {
                    console.log("COULD NOT LOG IN");
                    req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
    }
));
// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        funct.localReg(username, password)
            .then(function (user) {
                if (user) {
                    console.log("REGISTERED: " + user.username);
                    req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
                    done(null, user);
                }
                if (!user) {
                    console.log("COULD NOT REGISTER");
                    req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
    }
));


//Configure the app
var app = express();
app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var config = require('./config.js');
funct = require('./functions.js');


//===============EXPRESS================
// Configure Express
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


//include routes
var index = require('./routes/index');
var users = require('./routes/users');
var restaurants = require('./routes/restaurants');

// Connect to the db
var mongoDbUrl = "mongodb://tableeat:ajou2016@ds045521.mlab.com:45521/tableeatdb";
mongoose.connect(mongoDbUrl);

//Define the routes for the REST API
app.use('/api', index);
app.use('/api', users);
app.use('/api', restaurants);
module.exports = app;


// Session-persisted message middleware
app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main' //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Define the port
app.listen(3000);
console.log('Listening on port 3000...');