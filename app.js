"use strict";

var express = require('express');
var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var routes = require('./routes');

var app = express();

// environment setup
var port = process.env.PORT || 9000;
app.use(express.static(__dirname + '/public')); // static files location
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// var router = express.Router();
//
 var scb_url = "https://smart-creative-brief.googleplex.com/creative/53/";
 var options = {
        url: scb_url,
        headers: {
            'Access-Control-Allow-Origin':'http://smart-creative-brief.googleplex.com/',
            'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers':'Origin, X-Request-With, Content-Type, Accept',
            'Access-Control-Allow-Credentials':true
        }
};


app.get('/', routes.index);

app.get('/scrape', function(){
 //   var scb_url = 'https://news.ycombinator.com'; //
    console.log(' Scraping ' + scb_url + ' ....');

    // parse HTML handler
    function parseHTML(error, response, html) {
        if (!error && response.statusCode === 200) {

            console.log(html);
            console.log('- LOADED -');
            var $ = cheerio.load(html);

                 $('div.creative-events').each(function(i, element){
                  // var a = $(this).prev();
                  // console.log(a.text());
                    console.log('---');
                     console.log($this.next());
                });

        } else {
            console.log('Error: ' +  error);
        }

        console.log( "Response ---- \n" + response);
        for (var i in response) {
            console.log( i + ":" + response[i]);
        }
    }


    // 1. load scb_url via request
    request(options, parseHTML);
});

app.listen(port);
console.log(' ----- Started app at port ' + port);

exports = module.exports = app;
