Users._ensureIndex({
  'profile.fname': 'text'
});

Meteor.publish(null, function () {
  return Users.find({_id: this.userId}, {fields: {'settings': 1}});
});

Meteor.publish('users_for_admin', function () {
  let user = Users.findOne(this.userId);
  if (user.settings.admin) {
    return Users.find({}, {fields: {'username': 1, 'emails': 1, 'profile': 1, 'settings': 1, 'server': 1}});
  }
});
