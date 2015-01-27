angular.module('app')
.controller('AuthCtrl', function($scope, $auth, $state, $rootScope) {
    if ($rootScope.loggedIn) {
        $state.go('logged.projects');
    }

    $scope.handleLoginBtnClick = function(authForm) {
        $auth.submitLogin(authForm)
        .then(function(resp) {
            $state.go('logged.projects');
        })
        .catch(function(resp) {
            $rootScope.flash("Invalid credentials", "danger");
        });
    };

    $scope.handleRegisterBtnClick = function(authForm) {
        var registrationForm = angular.extend({password_confirmation: authForm.password}, authForm);
        $auth.submitRegistration(registrationForm)
        .then(function(resp) {
            $rootScope.flash("Registered");
        })
        .catch(function(resp) {
            $rootScope.flash("E-mail already used", "danger");
        });
    };
})
