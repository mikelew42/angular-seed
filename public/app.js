angular.module('App', [])

.directive('sample', [function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/sample.html'
	};
}])