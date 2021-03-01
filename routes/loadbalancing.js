var express = require('express');
var router = express.Router();

/* GET form*/
router.get('/', function(req, res, next) {
    res.render('loadbalancing', { title: 'Express' });
});

/* POST  */
router.post('/', function(req, res, next) {

    const driver = require('bigchaindb-driver')
    const base58 = require('bs58');
    const { Ed25519Sha256 } = require('crypto-conditions');

    // BigchainDB server instance (e.g. https://example.com/api/v1/)
    const API_PATH = 'http://localhost:9984/api/v1/'

    // Create a new keypair.
    const alice = new driver.Ed25519Keypair()

    // Construct a transaction payload
    const tx = driver.Transaction.makeCreateTransaction(
        // Define the asset to store, in this example it is the current temperature
        // (in Celsius) for the city of Berlin.
        // { city: 'Berlin, DE', temperature: 22, datetime: new Date().toString() },
        { age: req.body.age,
          sex: req.body.sex,
          bmi: req.body.bmi,
         smoker: req.body.smoker,
         region: req.body.region,
         charge: req.body.charge
        }

        // Metadata contains information about the transaction itself
        // (can be `null` if not needed)
        // { what: 'My first BigchainDB transaction' },

        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(alice.publicKey))
        ],
        alice.publicKey
    )

    // Sign the transaction with private keys
    const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

    // Or use delegateSignTransaction to provide your own signature function
    // function signTransaction() {
    //     // get privateKey from somewhere
    //     const privateKeyBuffer = Buffer.from(base58.decode(alice.privateKey))
    //     return function sign(transaction, input, transactionHash) {
    //         const ed25519Fulfillment = new Ed25519Sha256();
    //         ed25519Fulfillment.sign(
    //             Buffer.from(transactionHash, 'hex'),
    //             privateKeyBuffer
    //         );
    //         return ed25519Fulfillment.serializeUri();
    //     };
    // }
    // const txSigned = driver.Transaction.delegateSignTransaction(tx, signTransaction())

    // Send the transaction off to BigchainDB
    const conn = new driver.Connection(API_PATH)

    var Txn, retrievedTx = null;
    conn.postTransactionCommit(txSigned)
        .then(retrievedTx => 
            Txn = retrievedTx.id,
            console.log('Transaction', retrievedTx.id, 'successfully posted.'))

    res.render('loadbalancing', { txnId: Txn });
});

module.exports = router;
