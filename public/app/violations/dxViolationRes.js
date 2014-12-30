'use strict'
angular.module('app').factory('dxViolationRes', function($resource){
	var ViolationResource = $resource('/api/violations/:id', {_id:"@id"},
	{
		'create1': {method: 'POST'},
		'index1':  {method: 'GET'},
		'show1':   {method: 'GET', isArray: false},
		'update1': {method: 'PUT'},
		'destroy1':{method: 'DELETE'}
	}
	);
	 return ViolationResource;
});