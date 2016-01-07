Meteor.methods({
  submitAttendance: function (groupId, clients) {
    console.log('submitAttendance');
    check(groupId, String);
    check(clients, [Object]);

    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to submit attendance.');
    }

    var user = Meteor.users.findOne(this.userId);

    var group = Groups.findOne(groupId);

    if (! ((user.settings.trainer && this.userId === group.trainer._id) || user.settings.admin)) {
      throw new Meteor.Error('no-permission',
        'Must be trainer of this group or admin to submit attendance.');
    }

    // console.log('clients: '+clients);

    if (Meteor.isServer) {
      // console.log('groupId: '+groupId);

      // console.log('group:'+ JSON.stringify(group , null, 2));

      var startDate = new Date(); // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")

      startDate.setSeconds(0);
      startDate.setHours(0);
      startDate.setMinutes(0);

      var dateMidnight = new Date(startDate);
      dateMidnight.setHours(23);
      dateMidnight.setMinutes(59);
      dateMidnight.setSeconds(59);

      var attendance = {},
          now = new Date();

      for (var i = 0; i < group.clients.length; i++) {

        if (group.clients[i].check === clients[i].check) { continue; }

        if (clients[i].check) {
          attendance = {
            trainer: group.trainer.name,
            group: group.name,
            client: clients[i].name,
            createdAt: now
          };
          Attendance.insert(attendance);
        } else {
          Attendance.remove({
            group: group.name,
            client: clients[i].name,
            createdAt: {
              $gt: startDate,
              $lt: dateMidnight
            }
          });
        }

      }

      Groups.update({_id: group._id}, {$set: {clients: clients}});

    }
  }
});