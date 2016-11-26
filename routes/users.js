//Import required files
var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');

//Configure the app
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


///ROUTES///

router.route('/register')
    .get(function(req, res) {
        res.send({ });
    })
    .post(function(req, res) {
        User.register(new User({ username : req.body.username }), req.body.password, function(err) {
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
        res.send({ user : req.user });
    })
    .post(passport.authenticate('local'), function(req, res) {
    res.redirect('/api');
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
    })
    .post(function(req, res) {
        console.log(req.body);
        var user = new User(req.body);

        user.save(function(err) {
            if (err) {
                return res.send(err);
            }
            res.send({ message: 'User Added' + ' name : ' + req.body});
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
        User.findOne({username: req.params.username}, function(err, user) {
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

module.exports = router;