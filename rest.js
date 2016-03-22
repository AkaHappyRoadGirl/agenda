(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #mainButton */
    $(document).on("click", "#mainButton", function(evt)
    {
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($(".uib_w_7"));  
    });
    
        /* button  #gotopage2 */
    $(document).on("click", "#gotopage2", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page2"); 
    });
    
        /* button  #gohome */
    $(document).on("click", "#gohome", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_100_31"); 
    });
    
        /* button  #butalert */
    $(document).on("click", "#butalert", function(evt)
    {
        /* your code goes here */ 
        alert('Soy Alerta');
    });
    
        /* button  #buttadd */
    $(document).on("click", "#buttadd", function(evt)
    {
        /* your code goes here */ 
        alert('llamo a añadir');
        insert();
    });
    
   
    alert('despues de getlocalstorage');
     
     
    /////final events
    // var db = getLocalstorage();
    
    ///set local
    function setlocal() 
{            
    db.setItem(document.getElementById("txtKey").value,
          document.getElementById("txtValue").value);
    getlocal();           
 }
    
    /////get local
    function getlocal()
 {            
    var res = document.getElementById("r");
    var pairs;            
    var i=0;
    var key;
    res.innerHTML  = "";
    for (i=0; i<=db.length-1; i++) {
    key = db.key(i);             
    res.innerHTML += "<div>"+ "key: "+ key +" value: "+db.getItem(key)+"</div>";
   }  
}
    ///////comprobar que existe
    function getopenDb() { 
    try {
        if (window.openDatabase) {                    
            return window.openDatabase;                    
        } else {
            alert('No HTML5 support');
            return undefined;
        }
    }
    catch (e) {
        alert(e);
        return undefined;
    }            
}
        ////
    var db = createTable();
    
    /////crearla
    function createTable() {
    var openDB = getopenDb();
        alert('creando db');
    if(!openDB)
    {                
        return;               
    }
    else
    {
        db = openDB('mydatabase2', '1.0', 'my db', 2*1024*1024);
        db.transaction(function (t) { 
        t.executeSql('CREATE TABLE IF NOT EXISTS myTable2(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL DEFAULT "JohnDoe", apellidos TEXT NOT NULL, telf TEXT NOT NULL);', [], null, null);               
        
    });
    selRows();
    return db;
    }            
}
    

    
    /////rellenarla
    function insert() {
    if(!db)
    {         
        alert('no hay db');
        return;                
    }
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var telf = document.getElementById("telf").value;

    db.transaction(function (t) { 
        t.executeSql("INSERT INTO myTable2('nombre','apellidos','telf') values('" + nombre + "','" + apellidos + "'," + telf + " );", [], null, null);
        alert("Row Inserted!");
        selRows();
    });
}
    /////seleccionar
    function selRows() {
    
    var q = "select * from myTable2";
    
    db.transaction(function (t) {
        t.executeSql(q, null, function (t, data) {
            var html = "<table><tr><td>ID</td><td>Nombre</td><td>Apellidos</td><td>Telf</td></tr>";
            for (var i = 0; i < data.rows.length; i++) {
                  html += "<tr><td>" + 
                  data.rows.item(i).id + "</td><td>" +
                  data.rows.item(i).nombre + "</td><td>" +
                  data.rows.item(i).apellidos + "</td><td>" +
                  data.rows.item(i).telf + "</td></tr>";
            }
            html += "</table>";
            var el = document.getElementById("main");
            el.innerHTML = html;
        });
    });
}
     
      /////buscar
    function searchRows(search_param) {
    
    var qu = "select * from myTable2 where nombre='"+search_param+"'";
    var re = document.getElementById("main");
            re.innerHTML = "cambiando r...";
        
    db.transaction(function (t) {
        t.executeSql(qu, null, function (t, data) {
            var html = "<table><tr><td>EN RE: ID</td><td>Nombre</td><td>Apellidos</td><td>Telf</td></tr>";
            for (var i = 0; i < data.rows.length; i++) {
                  html += "<tr><td>" + 
                  data.rows.item(i).id + "</td><td>" +
                  data.rows.item(i).nombre + "</td><td>" +
                  data.rows.item(i).apellidos + "</td><td>" +
                  data.rows.item(i).telf + "</td></tr>";
            }
            html += "</table>";
            var re = document.getElementById("main");
            re.innerHTML = html;
        });
    });
}
    ///////final
     
          /* button  #buscar */
    $(document).on("click", "#buscar", function(evt)
    {
        /* your code goes here */
        var search_param = document.getElementById("param_buscar").value;
        alert(search_param);
        searchRows(search_param);
    });
    
        /* button  #butsync */
    $(document).on("click", "#butsync", function(evt)
    {
           /* your code goes here */ 
        alert('intentando leer');
        /////micode
       
       
/////////////
    
    var res = document.getElementById("main");
     res.innerHTML = "<div>fuera de instrucciones</div>";
    var rootURL = 'http://localhost:40';
    $.ajax({
	type: 'GET',
	url: rootURL + '/wp-json/wp/v2/contacto',
	dataType: 'json',
	success: function(data){
	// do something with the data here
        
       alert(data[0].title.rendered);
         $('#main').append('hop');
        $('#main').append(data.content);

       
       }
}); //fin del each 
        
    }); //fin de butsync
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);

})();
