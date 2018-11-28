app.controller('featuredController', function($rootScope, $scope, $location, featured, articles) {
    $scope.articles = articles.featured();

    window.setTimeout(featured.initSlider, 500);
    window.setTimeout(featured.easeIn, 500);

    window.setTimeout(function(){
	    window.scrollTo(0,0);
	}, 500);
});

