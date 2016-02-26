/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (request, response) {

    if (request.session.authenticated) {
      var page = request.param('page');
      if (!page) {
        page = 1;
      }

      User.find({id:request.session.user.auth.id})
        .populate('files',{sort: 'createdAt DESC'})
        .exec(function(err, files) { // Find  user files

          var count = Object.keys(files[0].files).length - 2;
          var result = { files:[] };
          var pagination = { pages:[] };
          for (var j = 1; j <= Math.ceil(count / 12); j++ ) {
            pagination.pages.push({
              number: j,
              active:page
            });
          }
          for (var i = 0; i < 12; i++) { // pagination
            if (page == 1) {
              if (files[0].files[(page - 1) * page + i]) {
                result.files.push(
                  {
                    link: files[0].files[(page - 1) * page + i].link,
                    type: files[0].files[(page - 1) * page + i].type,
                    filename: files[0].files[(page - 1) * page + i].filename,
                    id: files[0].files[(page - 1) * page + i].id
                  }
                )
              }
            } else {
              if (files[0].files[(page - 1) * 12 + i]) {
                result.files.push(
                  {
                    link: files[0].files[(page - 1) * 12 + i].link,
                    type: files[0].files[(page - 1) * 12 + i].type,
                    filename: files[0].files[(page - 1) * 12 + i].filename,
                    id: files[0].files[(page - 1) * 12 + i].id
                  }
                )
              }
            }
          }
          response.view('index',{
            user: request.session.user.auth.username,
            files: result.files,
            pagination : pagination.pages
          })
      });
    } else {
      return response.view('index');
    }
  }

};

