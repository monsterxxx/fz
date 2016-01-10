// Meteor.users.allow({
//   update: function (userId, user, fields, modifier) {
//     return true;
//   }
//   // ,fetch: ['trainer', 'admin', 'master']
// });

Meteor.users.deny({
  update: function() {
    return true;
  }
});

Meteor.methods({
  updateUserProfile: function (userId, profile) {
    check(userId, String);
    check(profile, {
      fname: String
    });

    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update user profile.');
    }

    let user = Meteor.users.findOne(this.userId);

    if (! (userId === this.userId || user.settings.admin)) {
      throw new Meteor.Error('no-permission',
        'Must be the user or admin to update user profile.');
    }

    Users.update({_id: userId}, {$set: {profile: profile}});

    if (Meteor.isServer) {
      let userToUpdate = Users.findOne(userId);

      // console.log(JSON.stringify(userToUpdate , null, 2));

      if (userToUpdate.system.client) {
        Clients.update({_id: userToUpdate.system.client._id}, {$set: {profile: profile}});
      }
    }

  },

  updateUserSettings: function (userId, settings) {
    check(userId, String);
    check(settings, {
      client: Match.Optional(Boolean),
      trainer: Match.Optional(Boolean),
      admin: Match.Optional(Boolean),
      master: Match.Optional(Boolean)
    });

    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update user settings.');
    }

    let user = Meteor.users.findOne(this.userId);

    if (! (user.settings.admin)) {
      throw new Meteor.Error('no-permission',
        'Must be admin to update user settings.');
    }

    if (Meteor.isServer) {
      let userToUpdate = Users.findOne(userId);

      _.each(settings, function (permit, module) {
        if (permit !== userToUpdate.settings[module]) {

          if (['admin', 'master'].indexOf(module) >= 0) {
            throw new Meteor.Error('no-permission',
              'Admin cannot change admin or master permissions.');
          }
          if (module === 'client' && userToUpdate.system.client) {
            throw new Meteor.Error('invalid-action',
              'There are no ex-clients in the App.');
          }
          if (module === 'trainer' && userToUpdate.trainer) {
            throw new Meteor.Error('invalid-action',
              'There are no ex-trainers in the App.');
          }

        }
      });

      Users.update({_id: userId}, {$set: {settings: settings}});
    }

  }
});
