//Import required files
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
//var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//include routes
var index = require('./routes/index');
var User = require('./models/user');
var users = require('./routes/users');
var restaurants = require('./routes/restaurants');
var booking = require('./routes/bookings');

//Configure the app
var app = express();
app.use(logger('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var cors = require('cors');
app.options('*', cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//===============EXPRESS================
// Configure Express
app.use(cookieParser());
//app.use(methodOverride('X-HTTP-Method-Override'));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//===============PASSPORT===============
// Passport session setup.
/*
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

// Connect to the db
var mongoDbUrl = "mongodb://tableeat:ajou2016@ds045521.mlab.com:45521/tableeatdb";
mongoose.connect(mongoDbUrl);

//Define the routes for the REST API
app.use('/api', index);
app.use('/api', users);
app.use('/api', restaurants);
app.use('/api', booking);
module.exports = app;

//Define the port
app.listen(3000);
console.log('Listening on port 3000...');