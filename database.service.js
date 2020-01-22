require('dotenv').config();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds062059.mlab.com:62059/url-shortener-development`;
const nanoid = require('nanoid');


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