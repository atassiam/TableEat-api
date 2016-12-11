/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    street : "String",
    city : "String",
    zipode : "String"
});

module.exports = mongoose.model('Address', addressSchema);