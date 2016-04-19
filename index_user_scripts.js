/*jshint browser:true */
/* global $ */
(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
	 
	/* menu */	
		$("#toggle").click(function() {
			//window.alert('togle!');
			$(this).toggleClass("on");
			$("#menu").slideToggle("fast");
		});
	 
	 
	 
	/* imagen de la cabecera - seccion destacada */
		$("#menu .row .col img").click(function() {
			var miid= $(this).attr('src');
			$("h1 img").attr("src",miid);
			$("#menu").slideToggle("fast");
		});
	 
	 
    }//fin de register event handler
	
	
	///////al lío de programación

	///////////////////////////////////////////////


	//////////////////////////////////////////////////
	
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
