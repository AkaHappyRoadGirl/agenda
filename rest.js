/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Button */
    $(document).on("click", ".uib_w_2", function(evt)
    {
        /* your code goes here */ 
        alert('intentando leer');
        /////micode
        var res = document.getElementById("mocked");
        res.innerHTML = "<div>inicializado</div>";
       
/////////////
    
    var res = document.getElementById("mocked");
     res.innerHTML = "<div>fuera de instrucciones</div>";
    var rootURL = 'http://localhost:40';
    $.ajax({
	type: 'GET',
	url: rootURL + '/wp-json/wp/v2/contacto',
	dataType: 'json',
	success: function(data){
	// do something with the data here
        
       alert(data[0].title.rendered);
         $('#mocked').append('hop');
        $('#mocked').append(data.content);

       
        //fin del each
	}
});
    

    ///////////
    /////
    });
    
    }
    
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
