require('dotenv').config();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds062059.mlab.com:62059/url-shortener-development`;

exports.createShortUrl = function (param) {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve(param);
        } else {
            reject("Failure in database.service.createShortUrl");
        }
    });
}