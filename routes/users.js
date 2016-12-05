//Import required files
var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

//Configure the app
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
    },
    function(username, password, done) {
        User.findOne({ username: username },
            function (err, user) {
                if (err) { return done(err); }
                    if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
                //return bCrypt.compareSync(password, user.password);
            }
            return done(null, user);
        });
    }
));*/

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
///ROUTES///

passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({ 'username' :  username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);

                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with username '+username);
                    //return done(null, false, req.flash('message', 'User Not found.'));
                    return done(err);
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    //return done(null, false, req.flash('message', 'Invalid Password'));
                    return done(err);
                }
                // User and password both match, return user from
                // done method which will be treated like success
                console.log('User Login succesful');
                //return done(null, user);
                return done(null,user);
            }
        );
    }));

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({'username':username},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    //return done(null, false, req.flash('message','User Already Exists'));
                    return done(err);
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.type = req.body.type;
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.firstname = req.body.firstname;
                    newUser.lastname = req.body.lastname;

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
/*
router.route('/register')
    .get(function(req, res) {
        res.send({ });
    })
    .post(function(req, res) {
        User.register(new User({ firstname : req.body.firstname, lastname : req.body.lastname, username : req.body.username, password : req.body.password}), function(err) {
            if (err) {
                return res.send({ error : err.message });
            }

            passport.authenticate('local')(req, res, function () {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/api');
                });
            });
        });
    });

router.route('/login')
    .get(function(req, res) {
        res.send({ user : req.user })
    })
    .post(passport.authenticate('local'), function(req, res) {
        req.session.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/api');
        });
    });

router.route('/login/:name')
    .get(function(req, res) {
        User.findOne({username: req.user.username}, function(err, user) {
            if (err) {
                return res.send(err);
            }

            res.json(user);
        });
    })
    .put(function(req,res){
        User.findOne({username: req.user.username }, function(err, user) {
            if (err) {
                return res.send(err);
            }

            for (prop in req.body) {
                user[prop] = req.body[prop];
            }

            // save the movie
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.json({ message: 'User updated!' });
            });
        });
    });

router.route('/logout')
    .get(function(req, res) {
    req.logout();
    res.redirect('/api/login');
});

router.route('/ping')
    .get(function(req, res){
    res.status(200).send("pong!");
});

router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users);
        });
    });

router.route('/users/:name')
    .put(function(req,res){
        User.findOne({username: req.params.username }, function(err, user) {
            if (err) {
                return res.send(err);
            }

            for (prop in req.body) {
                user[prop] = req.body[prop];
            }

            // save the movie
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.json({ message: 'User updated!' });
            });
        });
    })
    .get(function(req, res) {
        User.findOne({username: req.user.username}, function(err, user) {
            if (err) {
                return res.send(err);
            }

            res.json(user);
        });
    })
    .delete(function(req, res) {
        User.remove({
            username: req.params.username
        }, function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });
*/
module.exports = router;