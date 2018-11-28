app.controller('popularController', function($rootScope, $scope, $location, articles) {
    $scope.articles = articles.popular();
});