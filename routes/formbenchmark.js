var express = require('express');
var router = express.Router();

/* GET form*/
router.get('/', function(req, res, next) {
    res.render('formbenchmark', { title: 'Express' });
});


module.exports = router;
