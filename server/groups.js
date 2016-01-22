Meteor.publish('groups', function () {
  let user = Users.findOne(this.userId);

  if (user.settings.admin) {
    return Groups.find({});
  }

  if (user.settings.trainer) {
    return Groups.find({'trainer._id': user._id});
  }

  if (user.settings.client) {
    let client = Clients.findOne(user.system.client._id),
        groupIds = [];

    for (let i = 0; i < client.groups.length; i++) {
      groupIds.push(client.groups[i]._id);
    }

    return Groups.find({'_id': {$in : groupIds}});
  }

});
