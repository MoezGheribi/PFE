var mongoose = require('mongoose');

var MessagesSchema = mongoose.Schema({


  Sujet: String,

  Contenu: String,

});


var Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;
