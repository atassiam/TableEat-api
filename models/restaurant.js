/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Menu = require('../models/menu');
var Booking = require('../models/booking');

var restaurantSchema = new Schema({
    img: { data: Buffer, contentType: "String" },
    name : "String",
    typeOfFood : "String",
    description : "String",
    priceRange : "String",
    owner : {ownername : "String", owneremail : "String"},
    menu : {type: Schema.Types.Mixed, ref: 'Menu'},
    address : {street : "String", city : "String", zipode : "String"},
    bookings : [{type: Schema.Types.Mixed, ref: 'Booking'}],
    reviews : [{type: Schema.Types.Mixed, ref: 'Review'}]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);