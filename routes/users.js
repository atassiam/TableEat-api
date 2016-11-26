//Import required files
var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');

//Configure the app
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

///ROUTES///

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
        User.findOne({name: req.params.name }, function(err, user) {
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
        User.findOne({name: req.params.name}, function(err, user) {
            if (err) {
                return res.send(err);
            }

            res.json(user);
        });
    })
    .delete(function(req, res) {
        User.remove({
            name: req.params.name
        }, function(err, user) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;