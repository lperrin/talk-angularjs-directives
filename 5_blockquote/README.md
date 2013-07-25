Finally, we get to play with transclusions !

I want to hack `<blockquote>` tags with a directive so that they will be hidden by default. Transclude actually allows you to mess with the link function of the child so that you can decide where to insert it. In practive, given the following markup:

```html
<blockquote>
  Hello, this is a quoted message.
</blockquote>
```

And this template:

```html
<div>
  <button>Show More</button>
  <div ng-transclude></div>
</div>
```

You will get this instead of your blockquote:

```html
<div>
  <button>Show More</button>
  <div ng-transclude>
    Hello, this is a quoted message.
  </div>
</div>
```

Basically, transcluding allowed us to added a new level in the DOM. You can also do this manually in the compile function:

```javascript
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
```

When you pass `transclude: true`, your compile function receives a `transclude` param. When called, it will link the child node again so you can decide where you want to insert it. In our case, since I no longer have `ng-transclude`, I marked the div with the blockquote-target class.

You might wonder why you should go through the pain of doing this ? One reason is that Angular 1.1.x adds a very useful service called $animator to which you can delegate DOM manipulation:

```javascript
compile: function (element, attrs, transclude) {
  return function ($scope, $element, $attrs) {
    var childElement, childScope;
    var animate = $animator($scope, $attrs);

    $scope.hidden = true;

    $scope.$watch('hidden', function (hidden) {
      if (childElement) {
        // formerly childElement.remove()
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
          // formerly something like $element.append
          animate.enter(childElement, $element, $element.find('.blockquote-target'));
        });
      }
    });
  };
}
```

`$animator` will look for `ng-animate` directives, which you can learn more about here http://www.yearofmoo.com/2013/04/animation-in-angularjs.html.

Last thing, Angular 1.1.x also brings `ng-if` (from Angular UI), which greatly simplifies everything. ng-if (and all other transcluding directives) integrates with ng-animate automatically.

Congratulations if you read this far ! Ping me (@l_perrin) on Twitter if you need help.