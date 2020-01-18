const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 
 * @param {string} urlString - A url string to be validated.
 * @returns {Object} - Returns an object containing the properties .isValid, (.url, or .error) depending on if the url validates. 
 */
function validateUrl(urlString) {
  let isValid = false;
  let url = null; 
  //try to create a new URL object
  try {
    url = new URL(urlString);
    isValid = true;
    return {isValid: isValid, url: url};
  } catch (error) {
    return {isValid, error: "Not a url. Please ensure to include protocol and host."};
  }
};  

app.post("/api/shorturl/new/", (req, res) => {
    let output;
    let originalUrl = req.body.url;
    let validUrl = validateUrl(originalUrl);
    if (validUrl.isValid) {
      output = "valid url input"; 
    } else {
      output = validUrl.error;
    }

    res.json({
        data: output
    });
});

// listen for requests //process.env.PORT
const listener = app.listen(8080, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });