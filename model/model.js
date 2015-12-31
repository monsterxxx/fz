Clients = new Mongo.Collection('clients');
Attendance = new Mongo.Collection('attendance');
Users = Meteor.users;

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    return true;
  }
  // ,fetch: ['trainer', 'admin', 'master']
});
