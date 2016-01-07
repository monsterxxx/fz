Meteor.publish(null, function () {
  return Meteor.users.find({_id: this.userId}, {fields: {'settings': 1, 'system': 1, 'emails': 1}});
});

Meteor.publish('users_extended', function () {
  return Meteor.users.find({}, {fields: {'settings': 1, 'system': 1, 'emails': 1}});
});
