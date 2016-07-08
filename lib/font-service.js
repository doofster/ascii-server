'use strict';

//Require Figlet module for text transformation
let figlet = require('figlet');

//Retrieve configuration
let config = require('../config.json');
let font = config.font;
let horizontalLayout = config.horizontalLayout;
let verticalLayout = config.verticalLayout;


/**
 * asciify - This method will asciify text from an HTTP request and respond the result
 *
 * @param  HttpRequest  request  HTTP request from the API
 * @param  HttpResponse response HTTP response for the API
 */
let asciify = function(request, response) {
	let text = request.query.text;

	//Convert to Ascii
	convertToAscii(text)
		.then(function(result) {
			//Convert result to HTML String
			result = convertToHtmlString(result);

			//Success Response
			response.json({
				result: result
			});
		})
		.catch(function(error) {
			console.log(error);
			//Error Response
			response.json({
				error: error
			});
		});
};
//Expose this method to the module
module.exports.asciify = asciify;


/**
 * convertToAscii - This method converts String into ASCII art and returns Promise with result
 *
 * @param  String text  Text to convert
 */
function convertToAscii(text) {
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
