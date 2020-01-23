require('dotenv').config();
const nanoid = require('nanoid');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-h3i7u.mongodb.net/test`;
const dbName = "development";
const os = require('os');

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
        MongoClient.connect(MONGODB_URI, function(err, client) {
            if (err) throw err;
            // Create a collection we want to drop later
            const collection = client.db(dbName).collection('urls');
            //insert long url and short url slug into collection. 
            let document = {"original_url" : urlString, "short_url": uniqueId};
            collection.insert(document, (err, result) => {
                if (err) reject (err);
                if (result.result.ok === 1) {
                    let doc = result.ops[0];
                    delete doc._id;
                    resolve(doc);
                }
            });
          });
    });
}