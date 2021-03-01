var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('scalabledriver', { title: 'Express' });
});

/* POST home page. */
router.post('/', function(req, res, next) {

  //Save data to mongodb

  var patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    age: req.body.age,
    sex: req.body.sex,
    bmi: req.body.bmi,
    smoker: req.body.smoker,
    region: req.body.region,
    charge: req.body.charge
    });

    patient.save(function(err) {
        if (err) throw err;
         
        console.log('Patient successfully saved.');
    });

});


module.exports = router;
