var express = require('express');
var router = express.Router();
var Patient = mongoose.model('Patient');


router.get('/list', function(req, res) {
    // mongoose operations are asynchronous, so you need to wait 
    Patient.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('mongo.ejs', {
            user : req.user,
            practices: data
        });
    });
});

module.exports = router;
