/*****************************************************************
** Author: Asvin Goel, goel@telematique.eu
**
** A plugin replacing the default controls by simple controls
** providing only navigation to the next or previous slide.
**
** Version: 0.1
** 
** License: MIT license (see LICENSE.md)
**
******************************************************************/

var RevealSimpleControls = window.RevealSimpleControls || (function(){
	var options = Reveal.getConfig().simplecontrols || {setSlideNumberColor: true};
	var reveal = document.querySelector(".reveal");
	var rightOffset = Reveal.getConfig().slideNumber ? 70 : 0;

	reveal.innerHTML = reveal.innerHTML +
			   '\n<div class="presentation-only" style="position: fixed; right: ' +
			   ( 60 + rightOffset ) +
			   'px; bottom: 30px; z-index: 30; font-size: 24px;"><a href="#" onclick="Reveal.prev(); return false;"><i class="simplecontrols fa fa-caret-left"></i></a></div>' +
		           '<div class="presentation-only" style="position: fixed; right: ' + 
			   ( 30 + rightOffset ) +
			   'px; bottom: 30px; z-index: 30; font-size: 24px;"><a href="#" onclick="Reveal.next(); return false;"><i class="simplecontrols fa fa-caret-right"></i></a></div\n';

	Reveal.addEventListener( 'ready', function( event ) {
		Reveal.configure( { controls : false } );
		if ( Reveal.getConfig().slideNumber ) {
			// only set slide number style if slide number is shown
			var slideNumber = document.querySelector(".slide-number");
			slideNumber.style.cssText = "position: fixed; display: block; right: 30px; top: auto; left: auto; width: 40px; bottom: 30px; z-index: 31; font-family: Helvetica, sans-serif; font-size:  12px; line-height: 1; padding: 5px; text-align: center; border-radius: 10px;";
			updateSlideNumberColor();
		}
	} );

	// workaround to react on theme changes - only works after slide change or resumed from pause
	Reveal.addEventListener( 'slidechanged', function( event ) {
		updateSlideNumberColor();
	} );
	Reveal.addEventListener( 'resumed', function( event ) {
		updateSlideNumberColor();
	} );

	function updateSlideNumberColor() {
		if ( !options.setSlideNumberColor ) return;
		var slideNumber = document.querySelector(".slide-number");
		slideNumber.style.backgroundColor = window.getComputedStyle(document.querySelector(".simplecontrols") ).color;
	}

	return this;

})();
