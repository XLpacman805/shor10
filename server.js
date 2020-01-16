const express = require('express');
const app = express();
const bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  

app.post("/api/shorturl/new/", (req, res) => {
    console.log(req.body);

    res.json({
        data: "hello world"
    });
});

// listen for requests //process.env.PORT
const listener = app.listen(8080, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });