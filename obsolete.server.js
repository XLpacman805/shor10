const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const randomString = require("random-string");
var homeUrl = "https://shor10.glitch.me/r/";


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

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

function generateUniqueName(dbc, response, db, full_url, useJSONP){ //dbc === data base collection
  var new_name = randomString({length:4}).toLowerCase();
  //check if new name exists in db.
   dbc.count({name: new_name}, (err, count)=>{
          if(err) throw err; 
      
          if(count > 0){//new_name exists ,generate a new string
            console.log("defined");
            generateUniqueName(dbc, response, db, full_url, useJSONP);
          }else{//new_name doesn't exist. 
            console.log("new_name is available, good to go.");
            //create a new db object for new_name and insert it into the db
            var url_object = {
              name: new_name, 
              full_url: full_url,
              short_url: homeUrl + new_name
            };
            dbc.insert(url_object, (err, element)=>{//callback
                if(err) throw err; 
                if(useJSONP)
                  db.close(response.jsonp(url_object).end());
                else
                  db.close(response.json(url_object).end());
            });    
          }            
        });
  
}//end uniqueString()

function shorten(new_url, response, useJSONP){
  //Connect to db and serch for new_url  
  mongo.connect(MONGODB_URI, (err, db) =>{
    if(err) throw err; 
    var links = db.collection("links");
    
    links.find({
      full_url: new_url
    }).toArray((err, docs)=>{
      if(err) throw err; 
      console.log("still working");
      var result = docs[0]; 
      //check if result is defined
      if(!Boolean(result)){ //new_url not defined in db
        generateUniqueName(links, response, db, new_url, useJSONP);
      }else{//new_url already exists in the db, just send the user the existing object. 
        if(useJSONP)
          db.close(response.jsonp(result).end());
        else
          db.close(response.json(result).end());
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
  var useJSONP = Boolean(req.query.callback);
  if(new_url.includes("http://") || new_url.includes("https://")){
    shorten(new_url, res, useJSONP);
  }else{
    var errorResponse = {name:"error",full_url:"error",short_url:"error", error:"You must include http:// or https:// in your url"};
    
    if(useJSONP)
      res.jsonp(errorResponse).end();
    else
      res.json(errorResponse).end();
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
