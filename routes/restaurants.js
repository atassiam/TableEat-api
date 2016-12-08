var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
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

        restaurant.save(function(err) {
            if (err) {
                return res.send(err);
            }
            //res.contentType(restaurant.img.contentType);
            res.send(req.body);
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
        Restaurant.findOne({ name: req.params.name}, function(err, restaurant) {
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
        console.log(req.body.bookings.bookingtime);
        var friend = [{"bookingtime": req.body.bookings.bookingtime, "bookinguser": req.body.bookings.bookinguser,"bookingdetails":req.body.bookings.bookingdetails}];
        Restaurant.findOneAndUpdate ({name: req.params.name},{$push: {bookings: friend}},{safe: true, upsert: true,new : true},function (err, menu) {


                if (err) {
                    return res.send(err);
                }


                res.send({message: 'Bookings Added'});

        });
    });

module.exports = router;