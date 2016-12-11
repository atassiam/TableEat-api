/**
 * Created by Ahmed on 12/11/2016.
 */
var Booking = require('../models/booking');
var express = require('express');
var router = express.Router();


router.route('/bookings')
    .get(function(req, res) {
        Booking.find(function(err, bookings) {
            if (err) {
                return res.send(err);
            }

            res.json(bookings);
        });
    })
    .post(function(req, res) {
        var booking = new Booking(req.body);
        booking.save(function(err) {
            if (err) {
                return res.send(err);
            }
            //res.contentType(restaurant.img.contentType);
            res.json({ message: 'Booking Added!' });
        });
    });

router.route('/bookings/:user')
    .get(function(req, res) {
        console.log(req.params.user);
        Booking.find({'bookUser.email': req.params.user},function(err, bookings) {

            if (err) {
                return res.send(err);
            }
            res.json(bookings);
        });
    });
module.exports = router;