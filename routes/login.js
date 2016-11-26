/**
 * Created by Ammar on 26/11/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');

//Configure the app
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//displays our signup page
router.route('/signin')
    .post(function(req, res) {
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        });
    });

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.route('/local-reg')
    .post(function(req, res) {
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signin'
        })
    });

//logs user out of site, deleting them from the session, and returns to homepage
router.route('logout')
    .get(function(req, res) {
        var name = req.user.username;
            console.log("LOGGIN OUT " + req.user.username)
        req.logout();
        res.redirect('/');
        req.session.notice = "You have successfully been logged out " + name + "!";
    });