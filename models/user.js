var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Booking = require('../models/booking')

var userSchema = new Schema({
    type : "String",
    firstname: "String",
    lastname: "String",
    username: "String",
    password: "String",
    bookings : [{type: Schema.Types.Mixed, ref: 'Booking'}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);