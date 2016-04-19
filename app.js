/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:true, cordova:false */

var phonecatApp = angular.module('ionicApp', ['ionic']);

//http://www.w3schools.com/angular/angular_http.asp
//http://codepen.io/octowombat/pen/eyngH
phonecatApp.controller('Splash', function($scope, $http) {
	//http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
	var rootURL = 'http://adivinanzas.pequenet.com/wp-json/wp/v2/posts?type=post&filter[posts_per_page]=100';
    $http({
        method : "GET",
        url : rootURL
    }).then(function mySucces(response) {
        //$scope.filters = response.data;
		localStorage.setItem('Angular-adivs', JSON.stringify(response.data));
		//console.log(response.data);
		console.log('escribiendo en local');
    }, function myError(response) {
		console.log(response.statusText);
		console.log('ha habido un error');
    });
});

phonecatApp.controller('Lista', function ($scope) {
	$scope.filters = { };
	
	var f7Contacts = localStorage.getItem("Angular-adivs");
	var data =  JSON.parse(f7Contacts);
	$scope.adivs = data;
	console.log('leyendo de base');
	
	$scope.clearFilter = function() {
      console.log("limpio filtro");
      $scope.filters = {};
    };
});

phonecatApp.controller('Respuesta', function ($scope) {		
	$scope.displayResp = {};
	$scope.displayResp = function(adiv) {
		console.log("respuesta" + adiv.content.rendered);
		$scope.displayResp[adiv] = true;  
    };

});




// ...additional event handlers here...
