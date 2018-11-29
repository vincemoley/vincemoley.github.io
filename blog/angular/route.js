app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'pages/featured.html'
        })
        .when('/post/:postId/view', {
            templateUrl: 'pages/post.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
