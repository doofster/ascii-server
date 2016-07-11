/**
 * This file is the entry point for the app.
 * Here, we define the API endpoints and spin up the server.
 */

'use strict';

//Set up the app to use the Express module
let express = require('express');
let app = express();

//Load up the Ascii Service class
let asciify = require('./lib/ascii-service');

//Set port
app.set('port', (process.env.PORT || 5000));

//Suggest endpoint
app.get('/asciify/suggest', asciify.suggest);

//Resolve endpoint
app.get('/asciify/resolve', asciify.resolve);

//Spin up server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
