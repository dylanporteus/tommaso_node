'use strict';

require('dotenv').config();

const express = require('express');
const googleTranslate = require('google-translate')(process.env.TRANSLATE_KEY);
const app = express();
const watson = require('watson-developer-cloud');

var text_to_speech = watson.text_to_speech({
  username: '<WATSON_UN>',
  password: '<WATSON_PW>',
  version: 'v1'
});
 

app.use('/', express.static(`${__dirname}/public`));

app.get('/translate', (req, res) => {
	let text = req.query.text;

	res.set('content-type', 'application/json')
	googleTranslate.translate(text, 'it', function(err, translation) {
		if (err) {
			res.status(500).send({ error: err.message })
		}
		else{
			res.send({ translation: translation.translatedText });
		}
	});
});

app.get('/text-to-speech.wav', (req, res) => {
	res.set('content-type', 'audio/wav');


	var params = {
	  text: req.query.text,
	  voice: 'it-IT_FrancescaVoice', // Optional voice 
	  accept: 'audio/wav'
	};
	 
	// Pipe the synthesized text to a file 
	text_to_speech.synthesize(params).pipe(res);

});

let port = parseFloat(process.env.PORT) || 3000;

console.log(`Listening on port ${port}`)

app.listen(
	port
);