var express = require('express');
var router = express.Router();
const mdbconn = require("../db/Mongolib.js");

const db='job';

/* GET home page. */
router.get('/', async function (req, res, next) {
    const offers = await getOffers();
  res.send(offers); 
});

function getOffers() {
    return mdbconn.conn().then((client) => {
      return client.db(db).collection('offers').find({}).toArray();
    });
  }

router.post('/postOffer', async function(req, res, next) {
    const newOffer = await insertOffer(req.body);
    res.send(newOffer);
})

function insertOffer(offer) {
    return mdbconn.conn().then((client) => {
      return client.db(db).collection('offers').insertOne(offer);
    });
  }
module.exports = router;