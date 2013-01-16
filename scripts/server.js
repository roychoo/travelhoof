var express = require('express'),
	util = require('util'),
	http = require('http');
var GooglePlaces = require('googleplaces');
var parameters;
var places = [];

var googlePlaces = new GooglePlaces('AIzaSyAICo5JmmmHgF9AtH6mTz0hdImT2PG2jXQ', 'json');

var app = express();
var items = new Array();

app.listen(3000);
util.puts('Application Server running at http://localhost:3000/');

parameters = {
  query:"restaurants in dublin"
};

app.get('/data', function(req, res) {
	var filteredArray = new Array();
	googlePlaces.textSearch(parameters, function (response) {
		filteredArray = response.results.filter(isWithPhoto);
		console.log(filteredArray.length);
		for (var i=0 ; len= filteredArray.length; i<len; i++) {
			//var place
		}
		req.end();
	});
});

var isWithPhoto = function(element, index, array) {
  if (element.photos) {
    return true;
  }
  return false;
}