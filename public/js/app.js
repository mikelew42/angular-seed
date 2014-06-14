angular.module('App', [])

.directive('sample', [function(){
	return {
		restrict: 'E',
		templateUrl: 'html/sample.html'
	};
}])