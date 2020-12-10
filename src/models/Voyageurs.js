var mongoose = require('mongoose');

var voyageursSchema = mongoose.Schema({

  Nom: String,
  Prenom: String,
  Email:{type:String,unique:true},
  Password: String,
  Adresse: String,
  NumTel:String,
  CIN : {type:Number , unique: true}


});


var Voyageurs = mongoose.model('Voyageurs', voyageursSchema);

module.exports = Voyageurs;
