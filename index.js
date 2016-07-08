'use strict';

//Set up the app to use the Express module
let express = require('express');
let app = express();

//Set up json body parsing for POST requests
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//Load up the Font Service class
let fontService = require('./lib/font-service');

app.set('port', (process.env.PORT || 5000));

app.get('/api/asciify', function(request, response) {
	fontService.asciify(request, response);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
