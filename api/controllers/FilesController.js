/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  upload: function  (req, res) {
      req.file('media').upload({
        maxBytes: 50000000,
        dirname: sails.config.appPath + "/assets/uploads/" + req.session.user.auth.username
        //saveAs: function(file, cb) {
        //  cb(null, file.filename);    // This is for taking filename from input
        //}
      }, function (err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }
        var fileDiscryptor = uploadedFiles[0]; // JSON from created file
        var src = fileDiscryptor.fd.substring(fileDiscryptor.fd.indexOf("uploads") - 1); // getting src for DB
        Files.create({  // create db object
          link: src,
          type: fileDiscryptor.type,
          filename: fileDiscryptor.filename,
          owner: req.session.user.auth.id
        }).exec(function (err, file) {
          if (err) {
            return res.badRequest('Something wrong with file');
          }
          setTimeout(function(){
            return res.redirect('/');
          },500)
        });

      });
    },
  uploadLink: function  (req, response) {
    var request = require('request');
    var fs = require('fs');
    var randomstring = require("randomstring");

    var url2 = req.param('url');
    request.head(url2, function (error, res, body) {
      if (error) {
        return response.badRequest(error);
      }
      if (res.headers['content-length'] > 130000000) {
        return response.badRequest('File is too big');
      }
      var src = sails.config.appPath + "/assets/uploads/" + req.session.user.auth.username + '/'
        + randomstring.generate(15) + '.' + res.headers['content-type'].split('/')[1];
      request(url2).pipe(fs.createWriteStream(src)).on('close', function(){
        return response.redirect('/');
      });

      Files.create({  // create db object
        link: src.substring(src.indexOf("uploads") - 1),
        type: res.headers['content-type'],
        filename:randomstring.generate(6),
        owner: req.session.user.auth.id
      }).exec(function (err, file) {
        if (err) {
          return res.badRequest('Something wrong with file');
        }
      });
    });
  },

  deleteFile: function  (req, response) {

  }

};

