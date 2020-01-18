const express = require('express');
const app = express();
const bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  

app.post("/api/shorturl/new/", (req, res) => {
    let body = req.body;

    res.json({
        data: body
    });
});

// listen for requests //process.env.PORT
const listener = app.listen(8080, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });