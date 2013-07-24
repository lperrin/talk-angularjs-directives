var demoApp = angular.module('demoApp', []);

demoApp.controller('demoCtrl', function ($scope) {
  $scope.versions = [
    {semver: '1.1.5', name: 'triangle-squarification'},
    {semver: '1.0.7', name: 'monochromatic-rainbow'},
    {semver: '1.1.4', name: 'quantum-manipulation'},
    {semver: '1.0.6', name: 'universal-irreversibility'},
    {semver: '1.1.3', name: 'radioactive-gargle'},
    {semver: '1.0.5', name: 'flatulent-propulsion'},
    {semver: '1.1.2', name: 'tofu-animation'},
    {semver: '1.0.4', name: 'bewildering-hair'},
    {semver: '1.1.1', name: 'pathological-kerning'}
  ];

  $scope.selection = [];
});

demoApp.directive('faSelect', ['$parse', function ($parse) {
  return {
    controller: function ($scope, $element, $attrs) {
      var getter = $parse($attrs.faSelect);

      function getSelection() {
        return getter($scope);
      }

      this.toggle = function (item, selected) {
        var selection = getSelection(),
            pos = selection.indexOf(item);

        // add or remove item from selection
        if (selected && pos < 0)
          selection.push(item);
        else if (!selected && pos >= 0)
          selection.splice(pos, 1);
      };
    }
  };
}]);

demoApp.directive('faSelectOption', function () {
  return {
    require: '^faSelect',

    scope: {
      item: '=faSelectOption'
    },

    link: function (scope, element, attrs, selectCtrl) {
      scope.$watch('checked', function (checked) {
        selectCtrl.toggle(scope.item, checked);
      });
    }
  };
});