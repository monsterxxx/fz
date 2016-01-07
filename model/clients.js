Meteor.methods({
  addClient: function (client, groupId) {
    check(client, Object);
    check(groupId, String);

    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to insert new client.');
    }

    var user = Meteor.users.findOne(this.userId);

    if (! (user.settings.trainer || user.settings.admin)) {
      throw new Meteor.Error('no-permission',
        'Must be trainer or admin to insert new client.');
    }

    // console.log('groupId: '+groupId);

    var group = Groups.findOne(groupId);

    // console.log('group:'+ JSON.stringify(group , null, 2));

    client.createdAt = new Date();
    client.groups = [{
      _id: group._id,
      name: group.name
    }];

    client._id = Clients.insert(client);

    // console.log('client:' +JSON.stringify(client , null, 2));

    Groups.update({_id: group._id}, {$push: {
      clients: {
        _id: client._id,
        name: client.name
      }
    }});

  }
});
