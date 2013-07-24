var demoApp = angular.module('demoApp', []);

demoApp.directive('blockquote', function () {
  return {
    replace: true,

    transclude: true,

    restrict: 'E',

    templateUrl: 'blockquote-tpl',

    link: function (scope, element, attrs) {
      scope.hidden = true;
    }
  };
});
