/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    owner : {name : "", email : ""},
    menu : {starters : "String", main : "String", dessert : "String", drink : ""},
    name : "String",
    address : {street : "String", city : "String", zipode : Number}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);