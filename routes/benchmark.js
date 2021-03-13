var express = require('express');
var router = express.Router();

/* GET form*/
router.get('/', function(req, res, next) {

    res.render('benchmark', { title: 'Express' });
});

/* POST  */
router.post('/', function(req, res, next) {


    const driver = require('bigchaindb-driver')

    const alice = new driver.Ed25519Keypair()
    const conn = new driver.Connection('http://localhost:9984/api/v1/')
    const tx = driver.Transaction.makeCreateTransaction(
        { age: req.body.age,
          sex: req.body.sex,
          bmi: req.body.bmi,
          smoker: req.body.smoker,
          region: req.body.region,
          charge: req.body.charge
         },
        null,
        [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey))],
        alice.publicKey)
    const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
    conn.postTransactionCommit(txSigned)

    res.render('benchmark');
});

module.exports = router;
