var express=require("express")
var mongoose = require('mongoose');
var config = require('../config');
var jwt = require('jsonwebtoken');
var Messages=require("./../models/Messages");
var VerifyToken  =require("./verifytoken");
var bodyparser= require('body-parser');
var bcrypt = require ('bcryptjs');
var urlencodeParser=bodyparser.urlencoded({extended:false})


var router=express.Router()

router.get('/add',urlencodeParser,function (req,res) {
  var messages = new Messages({
    Sujet: req.query.Sujet,
    Contenu: req.query.Contenu,

  });
  messages.save(function(err , result) {
    if (err) throw err;
    //res.send(JSON.stringify(result))

    console.log('Messages successfully saved.');
    // crée un token
    var token = jwt.sign ({id: result._id}, config.secret, {
      expiresIn: 86400 // expire en 24 heures
    });
    res.status (200) .send ({auth:true, token: token});
  })
})


// router.get('/all', function(req,res){
//   var token = req.headers['x-access-token'];
//   if (!token)
//     return res.status(403).send({ auth: false, message: 'No token provided.' });
//   jwt.verify(token, config.secret, function(err,decoded) {
//     if (err)
//       return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//     // if everything good, save to request for use in other routes
//     /*
//             Conducteurs.find().exec(function(err, result) {
//                 if (err) throw err;
//                 res .send(result)
//                 console.log(result);
//             });*/
//     Messages.find().exec( function (err, message) {
//       if (err) return res.status(500).send("There was a problem finding the message.");
//       if (!message) return res.status(404).send("No message found.");
//
//       res.status(200).send(message);});
//   });
//
// })


// router.post('/login' , function(req,res){
//   Messages.find({$and:[{Sujet:req.body.Sujet},
//       {Contenu:req.body.Contenu}]}).exec(function(err, result) {
//     if (err) throw err;
//     res .send(JSON.stringify(result))
//     console.log(result);
//   });
// })

router.post('/authenticate',urlencodeParser, function(req, res) {
  Messages.find({Sujet:req.query.Sujet},function (err,result) {
    if(err) throw err;
    console.log(result);

    if(result.length==0){  res.status(200).send({ auth: false })//res.send('no message found')
    }
    else {
      bcrypt.compare(req.query.Contenu,result[0].Contenu,function (err,hash) {
        if(hash){
          var token = jwt.sign({ id: result[0]._id }, config.secret/*{
                        expiresIn: 86400 // expires in 24 hours
                    }*/);
          res.status(200).send({ auth: true, token: token ,message:result[0]});
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
    Messages.findById(decoded.id,{Contenu: 0}, function (err, message) {
      if (err) return res.status(500).send("There was a problem finding the message.");
      if (!message) return res.status(404).send("No message found.");

      res.status(200).send(message);
      //next(message); // add this line
    });
  });
});

/*router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});*/

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
  Messages.find().exec(function(err, result) {
    if (err) throw err;
    res .send(result)
    console.log(result);
  });
})

router.get('/allbyid',VerifyToken, function(req,res){
  Messages.findById({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res .send(JSON.stringify(result))
    console.log(result);
  });
})
router.get('/allbyidupdate',VerifyToken, function(req,res){
  Messages.findById({_id:req.query._id} , function(err, Messages) {
    if (err) throw err;

    Messages.Sujet= req.query.Sujet
    Messages.save(function(err , result) {
      if (err) throw err;
      res.send(result)
      console.log(' Messages updated successfully');
    });
  });

})


router.get('/delete',VerifyToken, function(req,res){
  Messages.remove({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result))
    console.log(result);
  });
})




module.exports = router





