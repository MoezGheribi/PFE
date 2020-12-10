


var express=require("express")
var mongoose = require('mongoose');
var config = require('../config');
var jwt = require('jsonwebtoken');
var Voyageurs=require("./../models/Voyageurs");
var VerifyToken  =require("./verifytoken");
var bodyparser= require('body-parser');
var bcrypt = require ('bcryptjs');
var urlencodeParser=bodyparser.urlencoded({extended:false})


var router=express.Router()

router.post('/add',urlencodeParser,function (req,res) {
  var hashedPassword = bcrypt.hashSync (req.query.Password, 12);
  var voyageurs = new Voyageurs({
    Nom: req.query.Nom,
    Prenom: req.query.Prenom,
    Email:req.query.Email,
    Password: hashedPassword,
    Adresse: req.query.Adresse,
    NumTel: req.query.NumTel,
    CIN: req.query.CIN
  });
  voyageurs.save(function(err , result) {
    if (err) throw err;
    //res.send(JSON.stringify(result))

    console.log('Voyageur successfully saved.');
    // crée un token
    var token = jwt.sign ({id: result._id}, config.secret, {
      expiresIn: 86400 // expire en 24 heures
    });
    res.status (200) .send ({auth:true, token: token});
  })
})





router.post('/login' , function(req,res){
  Voyageurs.find({$and:[{Email:req.body.Email},
      {Password:req.body.password}]}).exec(function(err, result) {
    if (err) throw err;
    res .send(JSON.stringify(result))
    console.log(result);
  });
})

router.post('/authenticate',urlencodeParser, function(req, res) {
  Voyageurs.find({Email:req.query.Email},function (err,result) {
    if(err) throw err;
    console.log(result);

    if(result.length==0){  res.status(200).send({ auth: false })//res.send('no user found')
    }
    else {
      bcrypt.compare(req.query.Password,result[0].Password,function (err,hash) {
        if(hash){
          var token = jwt.sign({ id: result[0]._id }, config.secret/*{
                        expiresIn: 86400 // expires in 24 hours
                    }*/);
          res.status(200).send({ auth: true, token: token ,user:result[0]});
        }
      })
    }
  })
})

router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    //res.status(200).send(decoded);
    Voyageurs.findById(decoded.id,{mdp: 0}, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the voyageur.");
      if (!user) return res.status(404).send("No voyageur found.");

      res.status(200).send(user);
      //next(user); // add this line
    });
  });
});


router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/refresh',function (req,res) {

  var token = jwt.sign({
    id:req.headers['id']
  }, config.secret);
  res.send({token : token})
})

router.get('/all',VerifyToken, function(req,res){
  Voyageurs.find().exec(function(err, result) {
    if (err) throw err;
    res .send(result)
    console.log(result);
  });
})

router.get('/allbyid', function(req,res){
  Voyageurs.findById({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res .send(JSON.stringify(result))
    console.log(result);
  });
})
router.get('/allbyidupdate', function(req,res){
  Voyageurs.findById({_id:req.query._id} , function(err, Users) {
    if (err) throw err;

    Users.Nom= req.query.Nom
    Users.Prenom= req.query.Prenom
    Users.Email= req.query.Email
    Users.Password= req.query.Password
    Users.Adresse= req.query.Adresse
    Users.NumTel= req.query.NumTel
    Users.CIN= req.query.CIN




    Users.save(function(err , result) {
      if (err) throw err;
      res.send(result)
      console.log(' Voyageurs updated successfully');
    });
  });

})


router.get('/delete' ,VerifyToken , function(req,res){
  Voyageurs.remove({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    console.log(result);
  });
})




module.exports = router





