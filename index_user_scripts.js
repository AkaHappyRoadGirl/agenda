(function()
{
 "use strict";
	/*globals $:false */
	/* jshint browser: true */
	/* global angular */
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
            /* priemra pantalla: inicio */
    $(document).on("click", "#inicio", function(evt)
    {
		activate_subpage("#page_100_31");
    });
    
    
     /* button  #mainButton */
    $(document).on("click", "#mainButton", function(evt)
    {    
         uib_sb.toggle_sidebar($(".uib_w_7"));  
    });
    

        /* button  #gohome */
    $(document).on("click", "#gohome", function(evt)
    {
         activate_subpage("#page_100_31"); 
    });
    
    
        /* button  #buttadd */
    $(document).on("click", "#buttadd", function(evt)
    {
        insert();
    });
    
   
    ///////comprobar que podemos ejecutar HTML5
    function getopenDb() { 
    try {
        if (window.openDatabase) {                    
            return window.openDatabase;                    
        } else {
            window.alert('Creo que el problema es un navegador raro: No HTML5 support');
            return undefined;
        }
    }
    catch (e) {
        window.alert(e);
        return undefined;
    }            
}//fin comprobar
     
     
    ////
	var db = createTable();
	var db_entidad = tabla_entidades();
     //createTable();
    /////crearla
    function createTable() {
		var res = document.getElementById("main");
		res.innerHTML = '<div>entrando en la funcion</div>';
        var openDB = JSON.parse(localStorage.getItem('conrestapi'));
		if(!openDB){                
			window.alert('creando db');
			var rootURL = 'http://agenda.happyroadgirl.com/';	
			res.innerHTML = '<div>Conectando para sincronizar con ' + rootURL + '</div>';
			
					$.ajax({
					type: 'GET',
					url: rootURL + '/wp-json/wp/v2/contacto',
					dataType: 'json',
					success: function(data){
						$.each(data, function(index, value) {
								openDB = JSON.parse(localStorage.getItem('conrestapi')) || [];
								openDB.push(new Contact({ "nombre": data[index].nombre, "apellidos": data[index].apellidos, "cargo": data[index].cargo, "entidad": data[index].entidad.nombre, "telf": data[index].telf, "email": "ainene@umail.com", "city": "London","picguid" :data[index].imagen.post_title }));
								localStorage.setItem('conrestapi', JSON.stringify(openDB));
							
							});//each
                        }//success
					}); //fin de conexion 
		}else{window.alert('db estaba creada');} 

		selRows();
}
    
    /////actualizarla
    function update(id_ext,nombre,apellidos,telf) {
    if(!db)
    {         
        window.alert('no hay db al actualizar');
        return;                
    }
}//fin actualizar
 
     
    /////rellenarla
    function insert() {
}

    /////seleccionar
    function selRows() {
        var el = document.getElementById("main");
        el.innerHTML = "<h3>Listado Completo</h3>";
        var f7Contacts = localStorage.getItem("conrestapi");
		var data =  JSON.parse(f7Contacts); // ? JSON.parse(f7Contacts) : tempInitializeStorage();
		
		var parcial_card = '';
		var select_cargos = '';
		var div_indice ='';
		
		$.each(data, function(i, item) {
			
            parcial_card += '<div class="panel" title="picguid'+i+'" id="item' + data[i].id + '" data-footer="none">';
			if(data[i].picguid)parcial_card += '<div class="item-media" style="float:left"><img src="images/'+data[i].picguid+'.png" width="103"></div>';
			parcial_card += '<p>' +data[i].nombre + '  ' +data[i].apellidos + '<br>';
			if(data[i].entidad)parcial_card += data[i].entidad;
			if(data[i].cargo)parcial_card += ': ' +data[i].cargo;
			parcial_card += '<br><a href="tel:' +data[i].telf+ '">' +data[i].telf+ '</a><br><a href="mailto:' +data[i].email1+ '">' +data[i].email1+ '</a></p></div>';
			//window.alert(data[i].entidad.nombre);
			select_cargos += '<option value="'+data[i].cargo+'">'+data[i].cargo+'</option>';
			
		});
		
		muestra_lista(data);
		$( parcial_card ).insertAfter( "#item1007" );
		//window.alert('relleno select de cargos');
		$('#sel_cargos').html(select_cargos);
}//fin seleccionar
	 
	///////////////////////ahora las entidades
	/////crearla
    function tabla_entidades() {
		var res = document.getElementById("main");
		res.innerHTML = '<div>entrando en la funcion de entidades</div>';
        var openDB = JSON.parse(localStorage.getItem('entidades'));
		if(!openDB){                
			window.alert('creando db entidades');
			var rootURL = 'http://agenda.happyroadgirl.com/';	
			res.innerHTML = '<div>Conectando para rellenar desde ' + rootURL + '</div>';
			
					$.ajax({
					type: 'GET',
					url: rootURL + '/wp-json/wp/v2/entidad',
					dataType: 'json',
					success: function(data){
						$.each(data, function(index, value) {
								openDB = JSON.parse(localStorage.getItem('entidades')) || [];
								openDB.push(new Entidad({ "nombre": data[index].nombre, "direccion": data[index].direccion }));
								localStorage.setItem('entidades', JSON.stringify(openDB));
							});//each
                        }//success
					}); //fin de conexion 
		}else{window.alert('db entidades estaba creada');} 

		fill_indice();
}
	 
	 
	function fill_indice(){
		var tabla_entidades = localStorage.getItem("entidades");
		var data =  JSON.parse(tabla_entidades); // ? JSON.parse(f7Contacts) : tempInitializeStorage();
	
		var div_indice ='';
		
		$.each(data, function(i, item) {
			div_indice += '<a class="button widget uib_w_27 but_indice" data-uib="app_framework/button" data-ver="1" style="border-top-right-radius: 0px; border-top-left-radius: 0px; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(102, 102, 102);">'+data[i].nombre + '</a>';
			
		});
		
		$( div_indice ).insertAfter( "#div_indice" );
		//window.alert();

	}//fin fill_indice

	/////muestra_lista
    function muestra_lista(data) {
		var parcial = '<ul class="list">';
		$.each(data, function(i, item) {
            parcial += '<li><a href="#item' + data[i].id + '">';
			if(data[i].picguid)parcial += '<div class="item-media" style="float:left"><img src="images/'+ data[i].picguid +'.png" width="44"></div>';
			parcial += '<p>' + data[i].nombre + ' ' + data[i].apellidos + '</p>';
			parcial +='</a><br>';
			if(data[i].cargo)parcial +=  data[i].cargo;
			//parcial += '<a href="tel:' +data[i].telf+ '">' +data[i].telf+ '</a>';
			parcial += '</li>';
		});
		parcial += '</ul>';
		$('#lista').html(parcial);
}//fin muestra_lista
	 
	 
      /////buscar
    function searchRows(param,search_param) {  
		var re = document.getElementById("main");
        re.innerHTML = "<h3>Buscando " + search_param + "</h3>";
		var f7Contacts = localStorage.getItem("conrestapi");
		var data =  JSON.parse(f7Contacts); 
		var as=$(data).filter(function (i,n){
			switch(param) {
				case 'entidad':
					if(n.entidad){return n.entidad.indexOf(search_param)>=0;}
					break;
				case 'cargo':
					return n.cargo.indexOf(search_param)>=0;
				default:
					return n.nombre.indexOf(search_param)>=0;
			}
		});
		muestra_lista(as);
}//fin buscar
     

     ///modelo objeto de contact
	function Contact(values) {
		values = values || {};
		this.id = values.id || generateGUID();
		this.picguid  = values.picguid;
		this.createdOn = values.createdOn || new Date();

		this.nombre = values.nombre || '';
		this.apellidos = values.apellidos || '';
		this.cargo = values.cargo || '';
		this.entidad = values.entidad || '';
		this.telf = values.telf || '';
		this.email1 = values.email1 || '';
		this.city = values.city || '';
		this.isFavorite = values.isFavorite || false;
    }//fin objeto contact
	 
	///modelo objeto de entidad
	function Entidad(values) {
		values = values || {};
		this.id = values.id || generateGUID();
		this.createdOn = values.createdOn || new Date();

		this.nombre = values.nombre || '';
		this.direccion = values.direccion || '';
		this.telf = values.telf || '';
		this.email1 = values.email1 || '';
		this.ciudad = values.ciudad || '';
		this.isFavorite = values.isFavorite || false;
    }//fin objeto entidad
	 
	
	//////////generar iud
	function generateGUID(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		});
		return uuid;
	}//Fin uid
	
    ///////final
     
          /* button  #buscar */
    $(document).on("click", "#buscar", function(evt)
    {
        var search_param = document.getElementById("param_buscar").value;
        searchRows('nombre',search_param);
    });
	 
	/* button  .but_indice */
    $(document).on("click", ".but_indice", function(evt)
    {
        var search_param = $(this).text();//document.getElementById("param_buscar").value;
		//window.alert($(this).text());
        searchRows('entidad',search_param);
		uib_sb.toggle_sidebar($(".uib_w_7"));
    });
	 
	/* select de cargos */
	$("#sel_cargos").change(function(){
			searchRows('cargo',$(this).val());
	});
    
        /* button  #butsync */
    $(document).on("click", "#butsync", function(evt)
    {
       // alert('conectando...');
    var res = document.getElementById("main");
    var rootURL = 'http://agenda.happyroadgirl.com/';	
    res.innerHTML = '<div>Conectando para sincronizar con ' + rootURL + '</div>';
	var nuevoarray = [];
	
    $.ajax({
	type: 'GET',
	url: rootURL + '/wp-json/wp/v2/contacto',
	dataType: 'json',
	success: function(data){
        $.each(data, function(index, value) {
               window.alert('colocando datos en su sitio 8 -> ' + data[index].imagen.post_title);
                //update(data[index].id,data[index].nombre,data[index].apellidos,data[index].telf);
				nuevoarray = JSON.parse(localStorage.getItem('conrestapi')) || [];
				nuevoarray.push(new Contact({ "nombre": data[index].nombre, "apellidos": data[index].apellidos, "cargo": data[index].cargo, "telf": data[index].telf, "email": "ainene@umail.com", "city": "London","picguid" :data[index].imagen.post_title }));
				localStorage.setItem('conrestapi', JSON.stringify(nuevoarray));
            });//each
       }//success
    }); //fin de conexion 
	//return JSON.parse(localStorage.getItem("conrestapi"));
    selRows();
    }); //fin de butsync
    
    
        /* button  #gotopage2 */
    
    
    
        /* button  #goto_add */
    $(document).on("click", "#goto_add", function(evt)
    {
         activate_subpage("#page_to_add"); 
    });
    
    
        /* button  #gotopage2 */
    $(document).on("click", "#gotopage2", function(evt)
    {
         activate_subpage("#page2"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);

})();
