var demoApp = angular.module('demoApp', []);

demoApp.controller('demoCtrl', function ($scope) {
  $scope.render = false;
});

demoApp.directive('div', ['$compile', function ($compile) {
  return {
    restrict: 'E',

    terminal: true,

    scope: {
      depth: '='
    },

    link: function (scope, element, attrs) {
      if(scope.depth > 3)
        return;

      var div = repeat('<div depth="depth + 1"></div>', 9);

      var childElement = angular.element(div);
      $compile(childElement)(scope);
      element.append(childElement);
    }
  };
}]);

function repeat(s, n){
    var a = [];
    while(a.length < n){
        a.push(s);
    }
    return a.join('');
}

$(function () {
  function renderSierpinksi(depth) {
    var div = $(repeat('<div></div>', 9));

    if(depth === 3)
      return div;

    div.html(renderSierpinksi(depth + 1));

    return div;
  }
  $('#jQueryRender').click(function () {
    $('#jQueryTarget').html(renderSierpinksi(0));
  });
});