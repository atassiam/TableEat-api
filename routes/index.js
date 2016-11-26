/**
 * Created by Ammar on 26/11/2016.
 */
var express = require('express')
    , router = express.Router()

router.use('/users', require('./users'))

//default routes here
//these could go in a separate file if you want
router.get('/', function(req, res) {
    res.send('Welcome to TableEat - Home page')
})

router.get('/about', function(req, res) {
    res.send('Learn about us')
})

module.exports = router;