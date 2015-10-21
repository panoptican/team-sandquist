var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.exporter']);

// Angular routing
app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider){


    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange');

    $locationProvider.html5Mode({
        enabled: true
    });
    $routeProvider.
        when('/home', {
            templateUrl: 'views/partials/home.html'
        }).
        when('/', {
            templateUrl: 'views/partials/login/login.html'
        }).
        when('/forgot', {
            templateUrl: 'views/partials/forgot/forgot.html'
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
            templateUrl: 'views/partials/archived-events/archived-events.html'
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
        when('/event', {
            templateUrl: 'views/partials/event/event.html'
        }).
        when('/reset/:token', {
            templateUrl: 'views/partials/reset/reset.html',
            controller: 'reset'
        }).
        otherwise({
            redirectTo: '/views/partials/login.html'
    })
}]);

// Toolbar controller
app.controller('toolbar', ['$rootScope','$location','$scope', '$window', function($rootScope, $location, $scope, $window){
    $scope.paths = true;
    $rootScope.$on('logged In', function(){
        if($window.sessionStorage.token == undefined){
            $scope.paths = true;
        }else{
            $scope.paths = false;
            $scope.user = {
                username: $window.sessionStorage.username.replace(/^"(.*)"$/, '$1')
            };
        }
    })
    $scope.goHome = function(){
        $location.path('/');
    }
}]);

// Directive to check the passwords are the same
app.directive('verifySame', function(){
       return {
           require: "ngModel",
           scope: {
               otherModelValue: "=compareTo"
           },
           link: function(scope, element, attributes, ngModel) {
               ngModel.$validators.compareTo = function(modelValue) {
                   return modelValue == scope.otherModelValue;
               };
               scope.$watch("password", function() {
                   ngModel.$validate();
               });
           }
       };
});