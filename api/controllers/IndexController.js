/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (request, response) {
    if (request.session.authenticated) {
      User.find({id:request.session.user.auth.id}).populate('files').exec(function(err, files) { // Find  user files
        response.view('index',{
          user: request.session.user.auth.username,
          files: files[0].files
        })
      });
    } else {
      return response.view('index');
    }
  }
};

