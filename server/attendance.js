Meteor.publish('attendance', function () {
  let user = Meteor.users.findOne(this.userId);

  if (user.settings.admin) {
    return Attendance.find({});
  }
});
