var demoApp = angular.module('demoApp', []);

demoApp.directive('blockquote', ['$animator', function ($animator) {
  return {
    replace: true,

    transclude: true,

    restrict: 'E',

    templateUrl: 'blockquote-tpl',

    compile: function (element, attrs, transclude) {
      return function ($scope, $element, $attrs) {
        var childElement, childScope;
        var animate = $animator($scope, $attrs);

        $scope.hidden = true;

        $scope.$watch('hidden', function (hidden) {
          if (childElement) {
            animate.leave(childElement);
            childElement = null;
          }

          if (childScope) {
            childScope.$destroy();
            childScope = null;
          }

          if (!hidden) {
            childScope = $scope.$new();
            transclude(childScope, function (clone) {
              childElement = clone;
              animate.enter(childElement, $element, $element.find('.blockquote-target'));
            });
          }
        });
      };
    }
  };
}]);