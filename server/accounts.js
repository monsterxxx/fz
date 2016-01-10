Accounts.onCreateUser(function(options, user) {
  user.settings = {};
  user.system = {};
  return user;
});
