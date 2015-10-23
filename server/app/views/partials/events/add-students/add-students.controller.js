app.controller('addStudents', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

    $http.get('/api/student').then(function (response) {
        $scope.students = response.data
    });

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    $scope.addStudent = function(id) {
        $http({
            method: 'POST',
            url: '/api/event/addStudent?_id=' + eventParam,
            data: {_id: id}
        }).then(function success(data) {
            console.log(data);
        }, function error() {
        }).then(function hideRow() {
            // hide row
        });
    }
}]);