var express = require('express');
var app = express();
var path = require('path');
var FB = require('fb');
var accesstoken;

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

    FB.setAccessToken(accesstoken);
    //var accessToken = FB.getAccessToken();

    var body = 'My first post using facebook-node-sdk';
    FB.api('/me', 'get', function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.name);
    });

    //console.log("new" + accessToken);
});


