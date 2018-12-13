app.controller('postController', function($rootScope, $scope, $routeParams, articles, $sce) {
	var id = parseInt($routeParams.postId);

	$scope.article = articles.retrieveById(id);

	if(id > 1){
		$scope.previousArticle = articles.retrieveById((id-1));
	}

	$scope.nextArticle = articles.retrieveById((id+1));

	window.setTimeout(function(){
	    window.scrollTo(0,0);
	}, 500);
});