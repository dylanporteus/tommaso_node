"use strict";

(function () {
   console.log('text_translation.js loaded.')
	$('.form-button').click(function(){
        var engInput = $('.form-input').val(); 
        $('audio').length && $('audio').remove();
        $.getJSON(`/translate?text=${engInput}`, (data) => {  //This is a shorthand for an ajax call.
        	let translation = data.translation;
        	$('#result-ita').text(translation);
        	let audio_element = $(
        		//The below code block is being passed to the client side html
        		//to implement the autoplay feature of an audio element.
				`
				<audio style="display:none;" autoplay>
				 <source src="/text-to-speech.ogg?text=${translation}" type="audio/mpeg">
				</audio>
				`
        	);

        	$(audio_element).appendTo('body')
        });

        return false;  //This line serves the same purpose as .eventPreventDefault()
    })

})();
