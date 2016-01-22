Meteor.publish('attendance', function () {
  let user = Users.findOne(this.userId);

  if (user.settings.admin) {
    return Attendance.find({});
  }
});
