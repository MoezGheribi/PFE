var mongoose = require('mongoose');

var PublicationSchema = mongoose.Schema({

  Trajet: {
    LieuDepart:String,
    LieuArivee:String
  },

  Commentaire: String,

  Voiture: {
    //Type:String,
    // Matricule:String,
    NbrPlaces:Number
  },

  nomconducteur:String ,
  prenomconducteur:String ,
  idconducteur: String ,

  Date: String,

  Prix: String,

});


var conducteursSchema = mongoose.Schema({

  Nom: String,
  Prenom: String,
  Email:{type:String,unique:true},
  Password: String,
  Adresse: String,
  NumTel:Number,
  CIN : {type:Number , unique: true},
 // permis: String,

  permis:{
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
  },

   publication:[PublicationSchema]


});


var Conducteurs = mongoose.model('Conducteurs', conducteursSchema);

module.exports = Conducteurs;
