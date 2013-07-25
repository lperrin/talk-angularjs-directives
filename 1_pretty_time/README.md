We start with a very simple directive to display time (something you definately need in an email client):

- Wrap a filter inside the directive so that the <fa-pretty-time> tag becomes completely transparent.

- Making time automatically update.

- Connecting tags sharing a directive with a global singleton service.

To update time, I originally used a naive approach:

```javascript
demoApp.directive('faPrettyTime', ['$timeout', function ($timeout) {
  return {
    restrict: 'E',

    replace: true,

    scope: {
      time: '='
    },

    template: '<div>{{time | prettyTime}}</div>',

    link: function (scope, element, attrs) {
      function refresh() {
        $timeout(refresh, 1000);
      }

      refresh();
    }
  };
}]);
```

Here, each directive will individually set a timeout to refresh itself. `$timeout` automatically calls `scope.$apply` so nothing actually needs to be done. There are 2 major problems:

- The timeout chain never stops, even after the scope is destroyed. You would need something like that:

```javascript
var cancel = $timeout(refresh, 1000);
…
scope.$on('$destroy', cancel);
```

- `scope.$apply` checks the whole `$rootScope` (not just the scope of the directive that initiated it). You can restrict to the current scope with:

```javascript
$timeout(refresh, 1000, false /* invokeApply */);
scope.$digest(); // just check this scope
```

The best tool to investigate these performance issues is the Web Inspector Timeline (in Webkit browsers).