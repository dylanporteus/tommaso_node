"use strict";

(function () {
   console.log('text_translation.js loaded.')
	$('.form-button').click(function(){
        var engInput = $('.form-input').val(); 
        
        $.getJSON(`/translate?text=${engInput}`, (data) => {
        	let translation = data.translation;
        	$('#result-ita').text(translation);
        });

        return false;
    })

})();
