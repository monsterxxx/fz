Meteor.startup(function () {
  var loadPlayground = false;
  if (loadPlayground) {

    Users.remove({});
    Groups.remove({});
    Clients.remove({});
    Leads.remove({});
    Attendance.remove({});

    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin',
      password: '123456',
      profile: {
        fname: 'Карл Густав Юнг'
      }
    });
    Meteor.users.update({username: 'admin'}, {$set: {'settings.admin': true}});
    Accounts.createUser({
      username: 'trainer',
      email: 'trainer@trainer',
      password: '123456',
      profile: {
        fname: 'Попов Александр Степанович'
      }
    });
    Meteor.users.update({username: 'trainer'}, {$set: {'settings.trainer': true}});
    Accounts.createUser({
      username: 'trainer2',
      email: 'trainer2@trainer2',
      password: '123456',
      profile: {
        fname: 'Колмогоров Андрей Николаевич'
      }
    });
    Meteor.users.update({username: 'trainer2'}, {$set: {'settings.trainer': true}});
  }

});
