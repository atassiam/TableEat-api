/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    starters : "String",
    main : "String",
    dessert : "String",
    drink : ""
});

module.exports = mongoose.model('Menu', menuSchema);