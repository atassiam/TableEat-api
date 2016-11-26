var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var express = require('express');
var router = express.Router();
var itemRouter = express.Router({mergeParams: true});

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

        restaurant.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'Restaurant Added' });
        });
    });


/////////////////////////
router.route('/restaurants/:name')
    .put(function(req,res){
        Restaurant.findOne({ name: req.params.name }, function(err, restaurant) {
            if (err) {
                return res.send(err);
            }

            for (prop in req.body) {
                restaurant[prop] = req.body[prop];
            }

            // save the movie
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
        Restaurant.findOne({restaurants:req.params.name}, function (err, menu) {
            console.log(menu);
            console.log(req.params.name);
            if (err) {
                return res.send(err);
            }

            res.json(Restaurant);
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

module.exports = router;