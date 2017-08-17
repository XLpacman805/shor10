Welcome to Shor10
=========================

***Shor10*** is a URL shortening microservice. It can be accessed via a browsers or through the API. The API responds in JSON format like so: 

```
{
"_id": "5993a2238c07b33b9aaa272a", 
"name": "a9in", 
"full_url": "http://twitter.com", 
"short_url": "https://shor10.glitch.me/r/a9in"
}

```

This project is live and fully functional. It utilized NodeJS, ExpressJS, MongoDB, and a few other dependencies for the front end. It can respond with JSONP if you append `&callback=?` to the URL query. 

Example ***GET*** request: 

`https://shor10.glitch.me/new/url?=http://someDomain.com&callback=?`

You can tinker with the API on a ***codepen*** I made used for testing. `https://codepen.io/xlpacman805/pen/oeopEq`

In reality this is more of a URL lengthener. However if this were to be deployed with a short domain name, it would work great. 
