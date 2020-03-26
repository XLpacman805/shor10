# URL Shortening Microservice - Shor10 #

## Shor10 has two functions ##

1. Take a long url and create a short unique ID for it.
2. Given the short unique ID, redirect the user to the long url.

### Creating a short url ###
Use a POST request to the [host]/api/shorturl/new/ endpoint with content type of x-www-form-urlencoded. The body needs to contain a key value pair in the parameters. Key = "url". Value = "https://somewebsite.com/". 

Request using Javascript :
```Javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("url", "https://g20.bimmerpost.com/forums/showthread.php?t=1566262");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("localhost:8080/api/shorturl/new/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  ```

Response:

```JSON
{
    "original_url": "https://g20.bimmerpost.com/forums/showthread.php?t=1566262",
    "short_url": "tlv3FtF"
}

```
### Using The Short URL ###
Just append the short url string to the root domain. The server will redirect the browser to the original url. 

[rootdomain].com/api/shorturl/tlv3FtF redirects to https://g20.bimmerpost.com/forums/showthread.php?t=1566262. 
