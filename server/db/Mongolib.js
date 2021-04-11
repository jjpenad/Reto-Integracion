const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.mongourl;


function MongoUtils() {
    const mu = {};
  
    // Esta función retorna una nueva conexión a MongoDB.
    // Tenga presente que es una promesa que deberá ser resuelta.
    mu.conn = () => {
      const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return client.connect();
    };
    return mu;
  }

  module.exports = MongoUtils();