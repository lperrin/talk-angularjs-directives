var demoApp = angular.module('demoApp', []);

demoApp.directive('blockquote', function ($animator) {
  return {
    replace: true,

    transclude: true,

    restrict: 'E',

    templateUrl: 'blockquote-tpl',

    link: function (scope) {
      scope.hidden = true;
    }
  };
});