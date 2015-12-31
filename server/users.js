Meteor.publish('users_extended', function () {
  return Meteor.users.find({}, {fields: {'settings': 1, 'system': 1, 'emails': 1}});
});
