var demoApp = angular.module('demoApp', []);

demoApp.controller('demoCtrl', ['$scope', function ($scope) {
  function randomTime() {
    return Date.now() - Math.round(Math.random()*2*60*60*1000);
  }

  $scope.times = [];

  for (var i = 0; i < 300; i++)
    $scope.times.push(randomTime());
}]);

demoApp.filter('prettyTime', function () {
  return function (time) {
    var now = Date.now(),
        elapsed = Math.round((now - time) / 1000),
        seconds = elapsed % 60,
        minutes = (elapsed - seconds)/60 % 60,
        hours = (elapsed - minutes*60 - seconds)/3600;

    function twoDigits(n) {
      return n < 10 ? '0' + n : n;
    }

    if (hours > 0)
      return hours + 'h ' + twoDigits(minutes) + 'm ' + twoDigits(seconds) + 's';
    else if (minutes > 0)
      return minutes + 'm ' + twoDigits(seconds) + 's';
    else
      return seconds + 's';
  };
});

demoApp.directive('faPrettyTime', ['$timeout', function ($timeout) {
  return {
    restrict: 'E',

    replace: true,

    scope: {
      time: '='
    },

    template: '<div>{{time | prettyTime}}</div>',

    link: function (scope, element, attrs) {
      var cancel;

      function refresh() {
        scope.$digest();
        cancel = $timeout(refresh, 1000, false);
      }

      cancel = $timeout(refresh, 1000, false);

      scope.$on('$destroy', cancel);
    }
  };
}]);