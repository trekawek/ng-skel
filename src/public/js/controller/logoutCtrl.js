angular.module('app')
.controller('LogoutCtrl', function($scope, $auth, $state, $rootScope) {
    $scope.handleLogoutBtnClick = function() {
        $auth.signOut()
        .then(function(resp) {
            $state.go('login');
        });
    }
})
