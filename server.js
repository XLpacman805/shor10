const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');

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
    let output;
    let originalUrl = req.body.url;
    let validUrl = validateUrl(originalUrl);
    if (validUrl.isValid) {
      output = {data: "valid url input"}; 
    } else {
      output = {error: "Invalid URL"};
    }

    res.json(output);
});

// listen for requests //process.env.PORT
const listener = app.listen(8080, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });