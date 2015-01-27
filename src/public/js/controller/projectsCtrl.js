angular.module('app')
.controller('ProjectsCtrl', function($scope, $http) {
    function loadProjects() {
        $http.get('/api/project').success(function(data) {
            $scope.projects = data;
        });
    }
    loadProjects();

    $scope.addProject = function() {
        $http.post('/api/project', $scope.form).success(function(data) {
            $scope.form = {};
            loadProjects();
        });
    }
    $scope.removeProject = function(projectId) {
        $http.delete('/api/project/' + projectId).success(function(data) {
            loadProjects();
        });
    }
})
