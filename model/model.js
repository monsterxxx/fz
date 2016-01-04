Users = Meteor.users;
Groups = new Mongo.Collection('groups');
Leads = new Mongo.Collection('leads');
Attendance = new Mongo.Collection('attendance');

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    return true;
  }
  // ,fetch: ['trainer', 'admin', 'master']
});
