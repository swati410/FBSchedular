var express = require('express');
var request = require('request');
var app = express();
var path = require('path');
var FB = require('fb');
var auth_code;
var access_token;
var PostID;



app.get('/auth/facebook/callback', function (req, res) {

    auth_code = req.query.code
    console.log(req);
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
                    //res.send(res.id);
                });
            }
        });
})

app.get('/schedular', function(request, response){
    response.sendFile(path.join(__dirname +'/fbpost.html'));
});

app.get('/login', function(request, response){
    response.sendFile(path.join(__dirname +'/login.html'));
});

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    //console.log("Example app listening at http://%s:%s", host, port)
})
