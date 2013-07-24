var demoApp = angular.module('demoApp', []);

demoApp.controller('demoCtrl', ['$scope', 'modals', function ($scope, modals) {
  $scope.show = function (modalName) {
    modals.show(modalName);
  };

  $scope.close = function () {
    modals.close();
  };
}]);

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

    controller: function ($scope) {
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