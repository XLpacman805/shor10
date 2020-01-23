require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const database = require('./database.service');

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 
 * @param {string} urlString - A url string to be validated.
 * @returns {Object} - Returns an object containing the properties .isValid, and .url
 */
function validateUrl(urlString) {
  let isValid = false;
  let url = null; 
  //try to create a new URL object
  try {
    url = new URL(urlString);
    isValid = true;
    
  } catch (error) {
    console.log(error);
  }
  return {isValid: isValid, url: url};
};  

app.post("/api/shorturl/new/", (req, res) => {
    let originalUrl = req.body.url;
    let validUrl = validateUrl(originalUrl);
    if (validUrl.isValid) { 
      database.createShortUrl(validUrl.url.href)
        .then((result) => {
          res.json({
            original_url: result.original_url, 
            short_url: result.short_url
          });
        }).catch((reason) => {
          res.json({error: reason});
        });
    } else {
      res.json({error: "Invalid URL"});
    }
});

app.get("/api/shorturl/:unique_id", (req, res) => {
  let parameter = req.params.unique_id;
  database.getLongUrl(parameter)
    .then((result) => {
      res.redirect(result.original_url);
    }).catch((err) => {
      console.log(err);
      res.json({error: err});
    });
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });