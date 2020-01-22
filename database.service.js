require('dotenv').config();
const nanoid = require('nanoid');
const test = require('assert');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-h3i7u.mongodb.net/test`;
const dbName = "development";

MongoClient.connect(MONGODB_URI, function(err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('urls');
    // Show that duplicate records got dropped
    col.find({}).toArray(function(err, items) {
        console.log(items);
        client.close();
    });
  });

/**
 * Finds the short URL in the database by the uniqueId.
 * @param {String} uniqueId 
 */
function getShortUrl (uniqueId) {
    // connect to mongodb. 
    //find by id:uniqueId. 
    //resolve promise with:
    return {
        original_url: "https://www.freecodecamp.org",
        short_url: 545
      }

      // reject promise with an error. 
}

/**
 * Creates a short url and returns one it. 
 * @param {URL.href} urlString - The full valid URL string. 
 * @returns {Promise}
 */
exports.createShortUrl = function (urlString) {
    return new Promise((resolve, reject) => {
        let uniqueId = nanoid(7); 

        // set the short url. 

        if (true) {
            resolve(uniqueId); //Resolve parameter just to test data flow. Remove this later.
        } else {
            reject("Failure in database.service.createShortUrl");
        }
    });
}