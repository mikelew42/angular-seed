angular.module('App', ['ngRoute', 'ui.router'])

.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($sP, $lP, $uRP){
	$lP.html5Mode(true);
	$sP.state('index', {
		url: '/',
		template: 'index'
	})
	$sP.state('project1', {
		url: '/project1',
		templateUrl: 'html/project1.html'
	})
	.state('tree', {
		url: '/tree',
		template: '<tree></tree>'
	})
	$sP.state('post', {
		url: '/:postId',
		controller: 'Post',
		templateUrl: 'html/post.html'
	})
}])

.directive('sample', [function(){
	return {
		restrict: 'E',
		templateUrl: 'html/sample.html'
	};
}])

.controller('Main', ['$scope', function($scope){
	$scope.posts = {
		'post-one': {
			title: 'Post One',
			content: 'Some <b>html</b> content.'
		}
	};

	$scope.host = new MPL.Host();
}])

.controller('Post', ['$scope', '$state', function($scope, $state){
	$scope.state = $state;
	if ($scope.posts[$state.params.postId])
		$scope.post = $scope.posts[$state.params.postId];
}])

.directive('tree', [function(){
	return {
		restrict: 'E',
		templateUrl: 'html/tree.html'
	};
}])

.factory('Tree', [function(){
	function Tree(){ this.initialize.apply(this, arguments); }
	Tree.prototype = {
		constructor: Tree,
		initialize: function(){}
	};
	return Tree;
}])