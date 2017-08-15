const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

function redirector(urlName, response){//url name is the last 4 characters in short-url. mydomain.com/a3fs => a3fs
  //search for urlName in in db.
  var homeUrl = "https://shor10.glitch.me/";
  urlName.toLowerCase();
  console.log("urlName: " + urlName);
  
  mongo.connect(MONGODB_URI, (err,db)=>{
    if(err) throw err; 
    var links = db.collection("links"); 
    console.log("collection found");
    
    links.find({
      name: urlName
    }).toArray( (err, docs) =>{
      if(err) throw err; 
      console.log("found "+urlName);
      var fullUrl = docs[0]["full-url"];
      db.close(response.redirect(fullUrl));
    });
  });
  
}//end redirector function

app.get("/r/:name", (req, res)=>{
  var name = req.params.name;
  redirector(name,res);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
