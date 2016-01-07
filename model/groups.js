Meteor.methods({
  insertGroup: function (group, trainerId) {
    check(group, Object);
    check(trainerId, String);

    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to insert new group.');
    }

    var user = Meteor.users.findOne(this.userId);

    if (! (user.settings.trainer || user.settings.admin)) {
      throw new Meteor.Error('no-permission',
        'Must be trainer or admin to insert new group.');
    }

    var trainer = this.userId === trainerId
      ? user
      : Meteor.users.findOne(trainerId);

    group.createdAt = new Date();
    group.trainer = {
      _id: trainer._id,
      name: trainer.profile.name
    };

    Groups.insert(group);

  }
});
