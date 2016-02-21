/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({

  register: function(req, res) {
    var params = req.params.all(),
      def = waterlock.Auth.definition,
      criteria = { },
      scopeKey = def.email !== undefined ? 'email' : 'username';

    var attr = {
      password: params.password
    };
    if (params.password < 3 || params.username.length < 3){
      return res.badRequest("Password or username is too short");
    }
    attr[scopeKey] = params[scopeKey];
    criteria[scopeKey] = attr[scopeKey];

    waterlock.engine.findAuth(criteria, function(err, user) {
      if (user)
        return res.badRequest("User already exists");
      else
        waterlock.engine.findOrCreateAuth(criteria, attr, function(err, user) {
          if (err)
            return res.badRequest(err);
          delete user.password;
          var fs = require('fs'); // create directory for user (*fix skipper do it himself)
          var basedir = './assets/uploads/';
          var dir = './assets/uploads/'+user.auth.username;
          if (!fs.existsSync(basedir)){
            fs.mkdirSync(basedir);
          }
          try {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
          } catch (err){
            return res.badRequest('Some error with your data');
          }

          return res.ok(user); // return 200 - OK
        });
    });
  }

});
