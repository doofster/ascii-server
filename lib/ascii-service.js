'use strict';

//Require Figlet module for ASCII art generation
let figlet = require('figlet');

//Retrieve configuration
let config = require('../config.json');
let font = config.font;
let horizontalLayout = config.horizontalLayout;
let verticalLayout = config.verticalLayout;

/**
 * resolve - This method will asciify text from an HTTP request and respond the result
 *
 * @param  HttpRequest  request  HTTP request from the API
 * @param  HttpResponse response HTTP response for the API
 */
let resolve = function(request, response) {
	let text = request.query.text;

	//Invalid Request
	if (!text) {
		response.status(400)
			.send('Missing Required Parameter "text"');
		return;
	}

	//Convert to Ascii
	generateAscii(text)
		.then(function(result) {
			//Convert result to HTML String
			let html = convertToHtmlString(result);

			//Success Response
			response.json({
				body: html,
				raw: true
			});
		})
		.catch(function(error) {
			console.log(error);
			response.status(500)
				.send('Whoops, something went wrong. ' + error);
			return;
		});
};
//Expose this method to the module
module.exports.resolve = resolve;

/**
 * suggest - This method will provide a suggestion based on supplied text.
 *
 * @param  HttpRequest  request  HTTP request from the API
 * @param  HttpResponse response HTTP response for the API
 */
let suggest = function(request, response) {
	let text = request.query.text;

	//Respond with current text TODO: Provide autocomplete
	response.json([{
		text: text,
		title: text
	}]);


};
//Expose this method to the module
module.exports.suggest = suggest;

/**
 * generateAscii - This method converts String into ASCII art and returns Promise with result
 *
 * @param  String text  Text to convert
 */
function generateAscii(text) {
	//Create Promise to cleanly handly async function
	let promise = new Promise(function(resolve, reject) {

		//Configure options
		let options = {
			font: font,
			horizontalLayout: horizontalLayout,
			verticalLayout: verticalLayout
		};

		//Use Figlet module to convert text
		figlet.text(text, options, function(err, res) {
			if (err) {
				//Reject Promise if there is an error
				reject(err);
			}
			//Resolve Promise with result
			resolve(res);
		});
	});
	return promise;
}

/**
 * convertToHtmlString - This method converts a JS String into an HTML String
 *
 * @param  String text  Text to convert
 */
function convertToHtmlString(text) {
	//Wrap in a <pre> tag to preserve whitespace
	let wrappedText = '<pre>';

	//Convert escape sequences into a <br> tag
	wrappedText += text.replace(/(?:\r\n|\r|\n)/g, '<br />');

	//CLose <pre> tag
	wrappedText += '</pre>';

	return wrappedText;
}
