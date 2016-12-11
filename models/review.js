var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    reviewer :{reviewername :"String", revieweremail :"String" },
    reviewtext:"String",
    reviewstars : "String"

});

module.exports = mongoose.model('Review', reviewSchema);