(function() {
  'use strict';

  angular
    .module('app')
    .component('contacts', {
      bindings: {},
      template: '<div class="container">' +
      '  <div class="row">' +
      '    <div class="column column-100">' +
      '      <h2>Contacts</h2>' +
      '    </div>' +
      '  </div>' +
      '  <contacts-toolbar></contacts-toolbar>' +
      '  <contacts-list contacts="vm.contacts"></contacts-list>' +
      '</div>' +
      '<div ui-view></div>',
      controller: ContactsController,
      controllerAs: 'vm'
    });

  ContactsController.$inject = ['$scope', 'contactsStateService'];

  /* @ngInject */
  function ContactsController($scope, contactsStateService) {
    var vm = this;

    vm.contacts = undefined;
    vm.selectedContact = undefined;

    vm.saved = saved;
    vm.destroyed = destroyed;

    activate();

    return;

    function activate() {
      loadContacts();
      $scope.$on('contacts:saved', function(event, contact) { saved(contact) });
      $scope.$on('contacts:destroyed', function(event, contact) { destroyed(contact) });
    }

    function loadContacts() {
      contactsStateService.loadContacts().then(function(contacts) {
        vm.contacts = contacts;
      });
    }

    function saved(contact) {
      var index = vm.contacts.findIndex(function (c) { return c.id === contact.id; });
      if (index >= 0) {
        vm.contacts[index] = contact;
      } else {
        vm.contacts.unshift(contact);
      }
    }

    function destroyed(contact) {
      vm.contacts.splice(vm.contacts.indexOf(contact), 1);
    }
  }
})();
