Meteor.startup(function () {

  // //sort clients in Groups
  // Groups.update( { }, {
  //   $push: {
  //     clients: {
  //       $each: [],
  //       $sort: { name: 1 }
  //     }
  //   }
  // }, { multi: true } );
  //
  // //sort groups in Clients
  // Clients.update( { }, {
  //   $push: {
  //     groups: {
  //       $each: [],
  //       $sort: { name: 1 }
  //     }
  //   }
  // }, { multi: true } );

});
