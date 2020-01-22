require('dotenv').config();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds062059.mlab.com:62059/url-shortener-development`;

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
 * Hashes a unique id based on url string. 
 * @param {URL.href} urlString
 * @returns {String} 
 */
function createUniqueId(urlString) {
    //return a hashed url string.
    return String; 
}

function setShortUrl (uniqueId) {
    return 1; 
}

/**
 * Creates a short url and returns one if it already exists. 
 * @param {URL.href} urlString - The full valid URL string. 
 * @returns {Promise}
 */
exports.createShortUrl = function (urlString) {
    return new Promise((resolve, reject) => {
        //hash url.

        //Check if url is already shortened by:
        //find short url. 
        //if short url found, resolve that. 

        // if short url not found: 
        //

        if (true) {
            resolve(urlString); //Resolve parameter just to test data flow. Remove this later.
        } else {
            reject("Failure in database.service.createShortUrl");
        }
    });
}