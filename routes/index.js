/**
 * Created by Ammar on 26/11/2016.
 */
var express = require('express')
    , router = express.Router();
var passport = require('passport');
router.use('/users', require('./users'));

//default routes here
//these could go in a separate file if you want
router.get('/', function(req, res) {
    res.send('Welcome to TableEat - Home page')
});

router.get('/about', function(req, res) {
    res.send('Learn about us')
});

/* Handle Login POST */
/*router.post('/login',
    passport.authenticate('login', {
    successRedirect: '/api',
    failureRedirect: '/api/login',
    failureFlash : true
}));
*/
/*
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if ( err ) {
            next(err);
            return
        }
        // User does not exist
        if ( ! user ) {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
            return
        }
        req.logIn(user, function(err) {
            // Invalid password
            if ( err ) {
                req.flash('error', 'Invalid email or password');
                next(err);
                return
            }
            res.redirect(req.session.redirectTo || '/');
            return
        });
    })(req, res, next);
});
*/

/* GET Registration Page */
router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
});

/* Handle Registration POST */
/*router.post('/signup',
    passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
}));*/

router.post('/signup',
    passport.authenticate('signup',
        { failureRedirect: '/signup' }),
    function(req, res) {
    res.send(req.body);
    //res.redirect('/');
    });

router.post('/login',
    passport.authenticate('login',
        { failureRedirect: '/login' }),
    function(req, res) {
        res.send(req.body);
        //res.redirect('/');
    });

module.exports = router;