angular.module('app')
.config(function($stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: '/partials/login.html',
        controller: 'AuthCtrl'
    })
    .state('logged', {
        abstract: true,
        template: '<ui-view/>',
        controller: function($rootScope, $state) {
            if (!$rootScope.loggedIn) {
                $state.go('login');
            }
        }
    })
    .state('logged.projects', {
        url: '/projects',
        controller: 'ProjectsCtrl',
        templateUrl: '/partials/projects.html'
    });
});
