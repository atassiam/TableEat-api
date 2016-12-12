var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var Booking = require('../models/booking');
var Review = require('../models/review');
var express = require('express');
var router = express.Router();
var itemRouter = express.Router({mergeParams: true});
var fs = require('fs');
var mongoose = require('mongoose');

router.use('/restaurants/:name/menus', itemRouter);

router.route('/restaurants')
    .get(function(req, res) {
        Restaurant.find(function(err, restaurants) {
            if (err) {
                return res.send(err);
            }

            res.json(restaurants);
        });
    })
    .post(function(req, res) {
        var restaurant = new Restaurant(req.body);
        var imgPath = req.body.img;
        restaurant.img.data = fs.readFileSync(imgPath);
        restaurant.img.contentType = 'image/png';
        var menu = new Menu(req.body.menu);
        menu.save();
        var bookings = new Booking(req.body.bookings);
        bookings.save();

        restaurant.save(function(err) {
            if (err) {
                return res.send(err);
            }
            //res.contentType(restaurant.img.contentType);
            res.json({ message: 'Restaurant Added!' });
        });
    });

/////////////////////////
router.route('/restaurants/:name')
    .put(function(req,res){
        Restaurant.findOne({ name: req.params.name }, function(err, restaurant) {
            if (err) {
                return res.send(err);
            }
            var imgPath = req.body.img;
            restaurant.img.data = fs.readFileSync(imgPath);
            restaurant.img.contentType = 'image/png';
            for (prop in req.body) {
                restaurant[prop] = req.body[prop];
            }

            // save the restaurant
            restaurant.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.json({ message: 'Restaurant updated!' });
            });
        });
    })
    .get(function(req, res) {
        /*Restaurant.find({"address.city" : req.params.name}, function(err, restaurant) {
            if (err) {
                return res.send(err);
            }

            res.json(restaurant);
        });*/
        Restaurant.findOne({name : req.params.name}, function(err, restaurant) {
            if (err) {
                return res.send(err);
            }

            res.json(restaurant);
        });
    })
    .delete(function(req, res) {
        Restaurant.remove({
            name: req.params.name
        }, function(err, restaurant) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

/////////////////////////
router.route('/restaurants/search/:name')
    .get(function(req, res) {
        Restaurant.find({"address.city" : req.params.name}, function(err, restaurant) {
         if (err) {
         return res.send(err);
         }

         res.json(restaurant);
         });

    });

/////////////////////////
router.route('/restaurants/:name/menus')
    .get(function(req, res) {
        Restaurant.findOne({name: req.params.name}, function (err, menu) {
            console.log(menu);
            console.log(req.params.name);
            if (err) {
                return res.send(err);
            }

            res.json(menu.menu);
        });
    })
    .post(function(req, res) {
        var menu = new Menu(req.body);

        menu.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'Menu Added' });
        });
    });
/////////////////////////////////////////
router.route('/restaurants/:name/address')
    .get(function(req, res) {
        Restaurant.findOne({name: req.params.name}, function (err, menu) {
            console.log(menu);
            console.log(req.params.name);
            if (err) {
                return res.send(err);
            }

            res.json(menu.address);
        });
    })
    .post(function(req, res) {
        var menu = new Menu(req.body);

        menu.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'Menu Added' });
        });
    });
router.route('/restaurants/:name/bookings')
    .get(function(req, res) {
        Restaurant.findOne({name: req.params.name}, function (err, menu) {

            if (err) {
                return res.send(err);
            }

            res.json(menu.bookings);
        });
    })
    .post(function(req, res) {
        var friend = new Booking(req.body);
        //friend.save();
        Restaurant.update({name: req.params.name},{$push: {"bookings": friend}},{safe: true, upsert: true},function (err, menu) {
            //var bookings = new Booking(req.body);
            friend.save();

                if (err) {
                    return res.send(err);
                }


                res.send({message: 'Bookings Added'});

        });
    });

router.route('/restaurants/:name/reviews')
    .get(function(req, res) {
        Restaurant.findOne({name: req.params.name}, function (err, menu) {

            if (err) {
                return res.send(err);
            }

            res.json(menu.reviews);
        });
    })
    .post(function(req, res) {
        var friend = new Review(req.body);
        //friend.save();
        Restaurant.update({name: req.params.name},{$push: {"reviews": friend}},{safe: true, upsert: true},function (err, menu) {
            var review = new Review(req.body);
            review.save();

            if (err) {
                return res.send(err);
            }


            res.send({message: 'Reviews Added'});

        });
    });

/////////////////////////
router.route('/restaurants/owner/:owneremail')
    .get(function(req, res) {
        Restaurant.find({"owner.owneremail" : req.params.owneremail}, function(err, restaurant) {
         if (err) {
         return res.send(err);
         }

         res.json(restaurant);
         });
    });

module.exports = router;