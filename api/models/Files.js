/**
 * Files.js
 *
 * @description :: Model for storing links to user profile
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    link: {
      type: 'string'
    },
    // Add a reference to User
    owner: {
      model: 'user'
    }
  }
};

