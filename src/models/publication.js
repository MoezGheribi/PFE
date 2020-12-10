var mongoose = require('mongoose');

var PublicationSchema = mongoose.Schema({

  Trajet: {
    LieuDepart:String,
    LieuArivee:String,
    Distance:String,
    Duration:String
  },

  Commentaire: String,
  nomconducteur:String ,
  prenomconducteur:String ,
  idconducteur: String ,

  Voiture: {
    Marque:String,
    Matricule:String,
    NbrPlaces:Number
  },

  Datevoyage:  String,
  Day : String ,
  Heure: String,

  Prix: String,

});


var Publication = mongoose.model('Publication', PublicationSchema);

module.exports = Publication;
