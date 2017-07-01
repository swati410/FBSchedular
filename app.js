var express = require('express');
var request = require('request');
var app = express();
var path = require('path');
var FB = require('fb');
var auth_code;
var access_token;



app.get('/auth/facebook/callback', function (req, res) {

    auth_code = req.query.code;
    //console.log("Hi" + auth_code);
    res.send('Recieved Code');
    request('https://graph.facebook.com/v2.9/oauth/access_token?client_id=1661598120549272&redirect_uri=http://localhost:8080/auth/facebook/callback&client_secret=8d57b232889eb9a213f512ab404f0c16&code='+auth_code,
        function (error, response, body) {
            if (!error ) {
                var newbody = JSON.parse(body);
                access_token = newbody.access_token
                console.log("Access  " + newbody.access_token);
                FB.setAccessToken(access_token);
                var body = 'My first post using facebook-node-sdk';
                FB.api('me/feed', 'post', { message: body }, function (res) {
                    if(!res || res.error) {
                        console.log(!res ? 'error occurred' : res.error);
                        return;
                    }
                    console.log('Post Id: ' + res.id);
                });
            }
        });
})

app.get('/post/task', function(request, response) {
    console.log("Hi");
    FB.setAccessToken('EAAXnNvW8G5gBABsUKOO8pradzRfFrWZAdsclcTFahBgAJZABmyxXswWkiC9PZChJ15wc2MPQnLxKgoCkCBM62s2iZCJHCz3F2ZCUGScUYn5p2mh87pBdo6ZAoWkJnZA0hPvIyXsUok5VE91srZBZC7ZAJgUlkaaLLPEPyvv1asa76RNwZDZD');
    var body = 'My first post my App';
    FB.api('me/feed', 'post', {message: body}, function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });
})

// app.get('/schedular', function(request, response){
//     response.sendFile(path.join(__dirname +'/fbpost.html'));
// });

app.get('/login', function(request, response){
    response.sendFile(path.join(__dirname +'/login.html'));
});

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    //console.log("Example app listening at http://%s:%s", host, port)
})
