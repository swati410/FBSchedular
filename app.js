var express = require('express');
//const https = require('https');
var app = express();
var path = require('path');
var FB = require('fb');
var accesstoken;


// https.get('https://graph.facebook.com/oauth/access_token?client_id=1661598120549272&client_secret=8d57b232889eb9a213f512ab404f0c16&grant_type=client_credentials', (res) => {
//     console.log('statusCode:', res);
//
//
// res.on('data', (d) => {
//     //process.stdout.write(d);
// });
//
// }).on('error', (e) => {
//     console.error(e);
// });

FB.api('oauth/access_token', {
    client_id: '1661598120549272',
    client_secret: '8d57b232889eb9a213f512ab404f0c16',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log(JSON.stringify(res));
    accesstoken = res.access_token;
    //console.log(accesstoken);

    FB.setAccessToken('EAACEdEose0cBANFrpxKYRje9N0vOpXSUdAgWoZBYjBpcehVQr5wmfrETnmtbsIGJjolTZCmJDpcio28pXxa4mPeipEPsZAwKEZAEzcR5wEuyfkCmGTwnYk7mD0mZBUgZAv3082m4yZAzh8nBdsq0CqXZCgoP3b97jHfbXC2TrZAZA4lJeyebuZBzvOxJkcmlppABGgZD');
    //var accessToken = FB.getAccessToken();


    var body = 'My first post using facebook-node-sdk';
    FB.api('me/feed', 'post', { message: body }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });



    //console.log("new" + accessToken);
});


