Meteor.startup(function () {
  // Meteor.users.update({username: 'monsterxxx'}, {$set: {'settings.admin': true}}); //Works

    // Users.find({}).forEach(
    //     function (elem) {
    //         Users.update(
    //             {
    //                 _id: elem._id
    //             },
    //             {
    //                 $unset: {
    //                     'profile.fullname': ''
    //                 }
    //             }
    //         );
    //     }
    // );

});
