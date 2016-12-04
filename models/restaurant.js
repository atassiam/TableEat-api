/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name : "String",
    type : "String",
    owner : {ownername : "String", owneremail : "String"},
    menu : {starters : "String", main : "String", dessert : "String", drink : "String"},
    address : {street : "String", city : "String", zipode : Number},
    bookings : {bookingtime:"String", bookinguser:"String", bookingdetails:"String"}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);