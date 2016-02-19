/**
 * Files.js
 *
 * @description :: Model for storing links to user files
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    link: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    filename:{
      type:'string',
      required: false
    },
    // Add a reference to User
    owner: {
      model: 'user'

    }
  }
};

