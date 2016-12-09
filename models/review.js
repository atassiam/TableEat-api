var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    reviewer :{name :"String", email :"String" },
    reviewtext:"String",
    reviewstars : "String"

});

module.exports = mongoose.model('Review', reviewSchema);