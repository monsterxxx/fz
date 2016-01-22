Accounts.onCreateUser(function(options, user) {
  user.settings = {};
  user.system = {};
  user.server = true;
  return user;
});
