Clients = new Mongo.Collection("clients");
Attendance = new Mongo.Collection("attendance");
Users = Meteor.users;

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    return true;
  },
  fetch: ['trainer', 'admin', 'master']
});

if (Meteor.isClient) {
  //configuring accounts loginButtons to contain username AND email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  angular.module('fz', [
    'angular-meteor',
    'fz.input',
    // 'angular-meteor.auth',
    'accounts.ui'])

  .directive('psSettings', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'client/components/ps-settings/ps-settings.html',
      controllerAs: 'Settings',
      controller: function ($scope, $reactive) {
        $reactive(this).attach($scope);

        this.helpers({
          // user: () => Users.find({_id: 'jtWocJzeGcdBZSKXW'}),
          user: () => Meteor.user()
        });
      }
    }
  })

  .controller('MainCtrl', function ($scope, $meteor, $reactive) {
    $reactive(this).attach($scope);

    $scope.helpers({
      clients() {
        return Clients.find({}, { sort: { fullname: 1 } });
      },
      users() {
        return Users.find({}, { sort: { createdAt: 1 } });
      }
    });

    this.newClient = {};

    this.addClient = () => {
      this.newClient.createdAt = new Date();
      console.log('newClient insert: '+ JSON.stringify(this.newClient , null, 2));
      Clients.insert(this.newClient);
      this.newClient = {};
    };

    $scope.delClient = (client) => {
      Clients.remove({_id: client._id});
    };

    console.log(JSON.stringify(Meteor.user() , null, 2));

  });

}

if (Meteor.isServer) {
  //Meteor.users.update('7CbZzGiGZab8nECb9', {$set: {trainer: false}}); //Works



  Meteor.startup(function () {
    // Kadira.connect('JYfyWqwRXeNixutMb', 'b35dbad2-33f2-4e3b-8042-0fb509db9426');
  });
}
