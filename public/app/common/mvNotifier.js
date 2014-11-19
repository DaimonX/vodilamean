'use strict'
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
	return {
		notifyError: function(msg){
			mvToastr.error(msg);
			console.log(msg);
		},
		notifySuccess: function(msg){
			mvToastr.success(msg);
			console.log(msg);
		},
	}
});