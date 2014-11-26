'use strict'
angular.module('app').controller('dxViolCtrl', function($scope) {
   $scope.myData = [
  	{name:'Toyota', number:'ВХ5567АЕ', fautured: true, published: new Date('01/05/2014')},
  	{name:'Tatra', number:'ВХ5568АЕ', fautured: true, published: new Date('02/05/2014')},
  	{name:'Reno', number:'ВХ5569АЕ', fautured: true, published: new Date('03/05/2014')},
  	{name:'BMW', number:'ВХ5570АЕ', fautured: true, published: new Date('06/07/2013')},
  	{name:'RR', number:'ВХ5571АЕ', fautured: true, published: new Date('11/05/2014')},
  	{name:'VW', number:'ВХ5572АЕ', fautured: true, published: new Date('12/11/2014')},
  	{name:'Toyota', number:'ВХ5573АЕ', fautured: true, published: new Date('10/12/2007')},
  	{name:'Toyota', number:'ВХ5574АЕ', fautured: true, published: new Date('08/05/2014')}
  ];
});