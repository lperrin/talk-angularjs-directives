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