const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const randomString = require("random-string");
var homeUrl = "https://shor10.glitch.me/r/";


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('node_modules/clipboard/dist'));

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

function generateUniqueName(dbc, response, db, full_url){ //dbc === data base collection
  var new_name = randomString({length:4}).toLowerCase();
  //check if new name exists in db.
   dbc.count({name: new_name}, (err, count)=>{
          if(err) throw err; 
      
          if(count > 0){//new_name exists ,generate a new string
            console.log("defined");
            generateUniqueName(dbc, response, db);
          }else{//new_name doesn't exist. 
            console.log("new_name is available, good to go.");
            //create a new db object for new_name and insert it into the db
            dbc.insert(
              {
                name:new_name,
                full_url: full_url,
                short_url: homeUrl + new_name
                
              }, (err, element)=>{
                if(err) throw err; 
                db.close(response.end(JSON.stringify({
                  name: new_name,
                  full_url: full_url,
                  short_url: homeUrl + new_name
                })));
            });    
          }            
        });
  
}//end uniqueString()

function shorten(new_url, response){
  //Connect to db and serch for new_url  
  mongo.connect(MONGODB_URI, (err, db) =>{
    if(err) throw err; 
    var links = db.collection("links");
    
    links.find({
      full_url: new_url
    },{_id:0}).toArray((err, docs)=>{
      if(err) throw err; 
      console.log("still working");
      var result = JSON.stringify(docs[0]); 
      //check if result is defined
      if(!Boolean(result)){ //new_url not defined in db
        generateUniqueName(links, response, db, new_url);
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
  if(new_url.includes("http://") || new_url.includes("https://")){
    shorten(new_url, res);
  }else{
    res.end(JSON.stringify({name:"error",full_url:"error",short_url:"error", error:"You must include http:// or https:// in your url"}));
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
