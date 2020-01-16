const express = require('express');
const app = express();

app.get("/api/shorturl/new", (req, res) => {
    res.json({
        data: "hello world"
    });
});

// listen for requests //process.env.PORT
const listener = app.listen(8080, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });