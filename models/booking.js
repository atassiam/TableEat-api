var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    bookUser :{name :"String", email :"String" },
    bookmenu:{
        starters :[{starteritem : "String", quantity:"String"}],
        main :[{mainitem : "String", quantity:"String"}],
        dessert :[{dessertitem : "String", quantity:"String"}],
        drink :[{drinkitem : "String", quantity:"String"}]
    },
    bookingtime : "String"

});

module.exports = mongoose.model('Booking', bookingSchema);