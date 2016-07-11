/**
 * This file is the entry point for the app.
 * Here, we define the API endpoints and spin up the server.
 */

'use strict';

//Set up the app to use the Express module
let express = require('express');
let app = express();

// Whitelist Mixmax
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: false
};

//Load up the Ascii Service class
let asciify = require('./lib/ascii-service');

//Set port
app.set('port', (process.env.PORT || 5000));

//Suggest endpoint
app.post('/asciify/suggest', cors(corsOptions), asciify.suggest);

//Resolve endpoint
app.post('/asciify/resolve', cors(corsOptions), asciify.resolve);

//Spin up server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
