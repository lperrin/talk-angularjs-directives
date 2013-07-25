var demoApp = angular.module('demoApp', []);

// This will attach an array with 300 random recent times so
// performance issues will be easy to detect.
demoApp.controller('demoCtrl', ['$scope', function ($scope) {
  function randomTime() {
    return Date.now() - Math.round(Math.random()*2*60*60*1000);
  }

  $scope.times = [];

  for (var i = 0; i < 300; i++)
    $scope.times.push(randomTime());
}]);

// Just a simple filter that you can call with {{time || prettyTime}}
demoApp.filter('prettyTime', ['prettyTimeTick', function (prettyTimeTick) {
  return function (time) {
    var now = Date.now(),
        elapsed = Math.round((now - time) / 1000),
        seconds = elapsed % 60,
        minutes = (elapsed - seconds)/60 % 60,
        hours = (elapsed - minutes*60 - seconds)/3600;

    function twoDigits(n) {
      return n < 10 ? '0' + n : n;
    }

    if (prettyTimeTick.long)
      return new Date(time).toString();

    if (hours > 0)
      return hours + 'h ' + twoDigits(minutes) + 'm ' + twoDigits(seconds) + 's';
    else if (minutes > 0)
      return minutes + 'm ' + twoDigits(seconds) + 's';
    else
      return seconds + 's';
  };
}]);

demoApp.directive('faPrettyTime', ['prettyTimeTick', function (prettyTimeTick) {
  return {
    restrict: 'E',

    replace: true,

    scope: {
      time: '='
    },

    template: '<div ng-click="toggle()">{{time | prettyTime}}</div>',

    link: function (scope) {
      scope.toggle = function () {
        prettyTimeTick.toggleFormat();
      };
    }
  };
}]);

// All fa-pretty-time directives are connected by a common singleton service.
// We use it to refresh all times at the same time
demoApp.service('prettyTimeTick', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
  function tick() {
    $timeout(function () {
      $rootScope.$apply();
      tick();
    }, 1000);
  }

  tick();

  this.long = false;

  this.toggleFormat = function () {
    this.long = !this.long;
  };
}]);