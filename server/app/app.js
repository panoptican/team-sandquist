var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.
    when('/', {
            templateUrl: 'views/partials/login.html'
        }).
    when('/home', {
            templateUrl: 'views/partials/home.html'
        }).
    when('/events', {
        templateUrl: 'views/partials/events/events.html'
    }).
    when('/students', {
            templateUrl: 'views/partials/students/students.html'
    }).
    when('/interviewers', {
            templateUrl: 'views/partials/interviewers/interviewers.html'
        }).

    when('/archived-events', {
            templateUrl: 'views/partials/archivedEvents/archivedEvents.html'
        }).

    when('/profile', {
            templateUrl: 'views/partials/profile/profile.html'
        }).

    when('/logout', {
            templateUrl: 'views/partials/logout/logout.html'
        }).

    when('/new-event', {
            templateUrl: 'views/partials/new-event/new-event.html'
        }).

    otherwise({
            redirectTo: '/index'
        })
}]);
