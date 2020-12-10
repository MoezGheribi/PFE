var express=require("express")
var mongoose = require('mongoose');
var config = require('../config');
var jwt = require('jsonwebtoken');
var publication=require("./../models/publication");
var Conducteurs=require("./../models/Conducteurs");
var VerifyToken  =require("./verifytoken");
var bodyparser= require('body-parser');
var bcrypt = require ('bcryptjs');
var urlencodeParser=bodyparser.urlencoded({extended:false})


var router=express.Router()

router.get('/add',urlencodeParser,function (req,res) {
console.log(req.query._id)
  Conducteurs.findById({_id: req.query._id}, function (err, result) {

    var publications = new publication({
      Trajet: {
        LieuDepart: req.query.LieuDepart,
        LieuArivee: req.query.LieuArivee,
        Distance: req.query.Distance,
        Duration: req.query.Duration
      },

      nomconducteur: result.Nom ,
      prenomconducteur:result.Prenom ,

      idconducteur: result._id ,


      Commentaire: req.query.Commentaire,

      Voiture: {
       Marque: req.query.Marque,
       Matricule: req.query.Matricule,
        NbrPlaces: req.query.NbrPlaces,
      },

      Datevoyage: req.query.Datevoyage,
      Day : req.query.Datevoyage.substring(0,10),

      Heure:req.query.Heure,

      Prix: req.query.Prix,

    });

    result.publication.push(publications)

    result.save(function (err, resultat) {
      if (err) throw err;
      res.send(JSON.stringify(resultat))

      console.log('publication successfully saved.');


    })

    publications.save(function (err, resultat) {
      if (err) throw err;
     // res.send(JSON.stringify(resultat))

      console.log('publication successfully saved.');


    })


  })

})



router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    //res.status(200).send(decoded);
    publication.findById(decoded.id,{Date: 0}, function (err, publication) {
      if (err) return res.status(500).send("There was a problem finding the publication.");
      if (!publication) return res.status(404).send("No publication found.");

      res.status(200).send(publication);
      //next(message); // add this line
    });
  });
});


router.get('/refresh',function (req,res) {

  var token = jwt.sign({
    id:req.headers['id']
  }, config.secret);
  res.send({token : token})
})

router.get('/all',VerifyToken, function(req,res){
  publication.find().exec(function(err, result) {
    if (err) throw err;
    res .send(result)
    console.log(result);
  });
})

router.get('/allbyid',VerifyToken, function(req,res){
  publication.findById({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res .send(JSON.stringify(result))
    console.log(result);
  });
})


router.get('/allbyLieu', function(req,res){



  console.log(req.query.Datevoyage.substring(0,10))
  console.log(req.query.LieuArivee)
  console.log(req.query.LieuDepart)

  publication.find({Day:(req.query.Datevoyage).substring(0,10)}).exec(function(err, result) {
    if (err) throw err;

    var data = []
    console.log(result)
    for(var i=0 ; i<result.length ; i++) {
      if (result[i].Trajet.LieuArivee == req.query.LieuArivee && result[i].Trajet.LieuDepart == req.query.LieuDepart) {

        data.push(result[i])
      }
    }



    res .send(data)
    console.log(data);
  });
})




router.get('/allbyidupdate',VerifyToken, function(req,res){
  publication.findById({_id:req.query._id} , function(err, publication) {
    if (err) throw err;

    publication.Commentaire= req.query.Commentaire
    publication.save(function(err , result) {
      if (err) throw err;
      res.send(result)
      console.log(' publication updated successfully');
    });
  });

})


router.get('/delete',VerifyToken, function(req,res){
  publication.remove({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    console.log(result);
  });
})




module.exports = router





