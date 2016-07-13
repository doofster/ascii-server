/**
 * This file is the entry point for the app.
 * Here, we define the API endpoints and spin up the server.
 */

'use strict';

//Set up the app to use the Express module
let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://compose.mixmax.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// So we can POST.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
let corsOptions = {
  origin: 'https://compose.mixmax.com',
  credentials: true
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
