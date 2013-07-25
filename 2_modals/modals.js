var demoApp = angular.module('demoApp', []);

demoApp.controller('demoCtrl', ['$scope', 'modals', function ($scope, modals) {
  $scope.show = function (modalName) {
    modals.show(modalName);
  };
}]);

// This service tracks the currently open modal
// It knows all the available modals because they register their
// controller when they are linked by AngularJS.
//
// modules requiring this service can simply call: modals.open('modal-name');
demoApp.service('modals', ['$rootScope', function ($rootScope) {
  this.modals = {};
  this.openModal = null;

  this.register = function (name, modal) {
    this.modals[name] = modal;
  };

  this.isModalOpen = function () {
    return !!this.openModal;
  };

  this.show = function (name) {
    var modal = this.modals[name];

    if (this.openModal === modal)
      return;

    if (this.openModal)
      this.openModal.toggle(false);

    modal.toggle(true);
    this.openModal = modal;
  };

  this.close = function () {
    if (this.openModal) {
      this.openModal.toggle(false);
      this.openModal = null;
    }
  };
}]);

demoApp.directive('faModal', ['modals', function (modals) {
  return {
    restrict: 'E',

    scope: {},

    // this controller can be used by directives in the same tag
    // by using "require"
    controller: function ($scope) {
      this.cancellable = false;

      this.toggle = function (open) {
        $scope.open = open;
      };
    },

    link: function (scope, element, attrs, controller) {
      modals.register(attrs.id, controller);

      scope.close = function () {
        modals.close();
      };
    }
  };
}]);

demoApp.directive('faSettings', function () {
  return {
    require: 'faModal',

    link: function (scope, element, attrs, modalCtrl) {
      modalCtrl.cancellable = true;
    }
  };
});

demoApp.directive('faComposer', ['modals', function (modals) {
  return {
    require: 'faModal',

    link: function (scope, element, attrs, modalCtrl) {
      scope.showSettings = function () {
        modals.show('settings');
      };
    }
  };
}]);

// This will open an absolutely positioned <div> that will intercept clicks
// when a modal is open. Based on its configuration, it will cancel it
demoApp.directive('faOverlay', ['modals', function (modals) {
  return {
    restrict: 'E',

    replace: true,

    template: '<div class="overlay" ng-show="isModalOpen()"></div>',

    link: function (scope, element) {
      scope.isModalOpen = function () {
        return modals.isModalOpen();
      };

      element.on('click', function ($event) {
        if (!modals.isModalOpen())
          return;

        $event.preventDefault();
        $event.stopPropagation();

        scope.$apply(function () {
          if (modals.openModal.cancellable)
            modals.close();
        });
      });
    }
  };
}]);