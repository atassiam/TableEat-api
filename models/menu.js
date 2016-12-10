/**
 * Created by Ammar on 26/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    starters : [{starterItem : "String"}],
    main : [{mainItem : "String"}],
    dessert : [{dessertItem : "String"}],
    drink : [{drinkItem : "String"}]
});

module.exports = mongoose.model('Menu', menuSchema);