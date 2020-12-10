var mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({


  Email:{type:String,unique:true},
  Password: String,



});


var Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
