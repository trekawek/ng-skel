angular.module('app', ['ng-token-auth', 'ui.router'])
.run(function($rootScope, $auth) {
    $rootScope.flash = function(msg, type) {
        $rootScope.flashMsg = msg || '';
        $rootScope.flashMsgType = type || 'success';
    };
    $auth.validateUser();
    $rootScope.$on('auth:login-success', function(ev, reason) {
        $rootScope.loggedIn = true;
    });
    $rootScope.$on('auth:logout-success', function(ev, reason) {
        $rootScope.loggedIn = false;
    });
    $rootScope.$on('auth:validation-success', function(ev, reason) {
        $rootScope.loggedIn = true;
    });

});
