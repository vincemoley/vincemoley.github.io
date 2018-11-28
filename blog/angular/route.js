app.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'pages/featured.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
