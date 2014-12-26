'use strict'
angular.module('app').factory('dxViolationRes', function($resource){
	var ViolationResource = $resource('/api/violations/:id', {_id:"@id"},
	{
		'create': {method: 'POST'},
		'index':  {method: 'GET'},
		'show':   {method: 'GET', isArray: false},
		'update': {method: 'PUT'},
		'destroy':{method: 'DELETE'}
	}
	);
	 return ViolationResource;
});