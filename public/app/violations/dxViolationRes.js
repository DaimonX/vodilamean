'use strict'
angular.module('app').factory('dxViolationRes', function($resource){
	var ViolationResource = $resource('/api/violations/');

	return ViolationResource;
});