const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const randomString = require("random-string");
var homeUrl = "https://shor10.glitch.me/";


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

function redirector(urlName, response){//url name is the last 4 characters in short-url. mydomain.com/a3fs => a3fs
  //search for urlName in in db.
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
      var fullUrl = docs[0]["full_url"];
      db.close(response.redirect(fullUrl));
    });
  });
  
}//end redirector function

function generateOriginal(new_url, response){
  //Connect to db and serch for new_url
  
  mongo.connect(MONGODB_URI, (err, db) =>{
    if(err) throw err; 
    var links = db.collection("links");
    
    links.find({
      full_url: new_url
    }).toArray((err, docs)=>{
      if(err) throw err; 
      console.log("still working");
      var result = JSON.stringify(docs[0]); 
      //check if result is defined
      if(!Boolean(result)){ //new_url not defined in db
        var new_name = randomString({length:4}).toLowerCase();
        //check if new name exists in db. 
        
        links.count({name: new_name}, (err, count)=>{
          if(err) throw err; 
          if(count > 0){//new_name exists
            db.close(response.end("defined"));
          }else{//new_name doesn't exist. 
            db.close(response.end("not defined"));
          }
            
        });
        
      }else{//new_url already exists in the db, just send the user the existing object. 
        db.close(response.end(result));
      }
    });
    
  });
  
  
  
}//end generateOriginal()



app.get("/r/:name", (req, res)=>{
  var name = req.params.name;
  redirector(name,res);
});

app.get("/new/",(req,res) =>{
  var new_url = req.query.url;
  generateOriginal(new_url, res);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
