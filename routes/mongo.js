var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


router.get('/list', function(req, res) {
    // mongoose operations are asynchronous, so you need to wait 
    // var MongoClient = require('mongodb').MongoClient;
    // var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bigchain");
    dbo.collection("assets").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    });
});

module.exports = router;
