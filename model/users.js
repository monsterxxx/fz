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
