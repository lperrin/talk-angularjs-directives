var demoApp = angular.module('demoApp', []);

demoApp.directive('blockquote', function () {
  return {
    replace: true,

    transclude: true,

    restrict: 'E',

    templateUrl: 'blockquote-tpl',

    compile: function (element, attrs, transclude) {
      return function ($scope, $element, $attrs) {
        var childElement, childScope;

        $scope.hidden = true;

        $scope.$watch('hidden', function (hidden) {
          if (childElement) {
            childElement.remove();
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
              $element.find('.blockquote-target').append(childElement);
            });
          }
        });
      };
    }
  };
});