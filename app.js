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

app.get('/', routes.index);

app.get('/scrape', function(){
 //   var scb_url = 'https://news.ycombinator.com'; //
    var scb_url = "https://smart-creative-brief.googleplex.com/creative/53/";
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
    }

    // 1. load scb_url via request
    request(scb_url, parseHTML);
});

app.listen(port);
console.log(' ----- Started app at port ' + port);

exports = module.exports = app;
