/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name : "String",
    type : "String",
    owner : {name : "", email : ""},
    menu : {restaurant : "String", starters : "String", main : "String", dessert : "String", drink : ""},
    address : {street : "String", city : "String", zipode : Number},
    bookings : {}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);