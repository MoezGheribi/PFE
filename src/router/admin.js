var express=require("express")
var mongoose = require('mongoose');
var config = require('../config');
var jwt = require('jsonwebtoken');
var Admin=require("./../models/admin");
var bodyparser= require('body-parser');
var bcrypt = require ('bcryptjs');
var nodemailer = require('nodemailer');

var urlencodeParser=bodyparser.urlencoded({extended:false})


var router=express.Router()

router.get('/sendMail',function (req,res) {



  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ghmoez07@gmail.com',
      pass: 'flonkess0123690'
    }
  });

  var mailOptions = {
    from: 'ghmoez07@gmail.com',
    to: req.query.email,
    subject: 'récupérer un mot de passe',
    text: 'Entrer un nouveau mot de passe'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


   res.send("okkkk")

})

router.get('/add',urlencodeParser,function (req,res) {
  var hashedPassword = bcrypt.hashSync (req.query.Password, 12);
  var admin1 = new Admin({

    Email:req.query.Email,
    Password: hashedPassword

  });
  admin1.save(function(err , result) {
    if (err) throw err;
    //res.send(JSON.stringify(result))

    console.log('Conducteur successfully saved.');
    // crée un token
    var token = jwt.sign ({id: result._id}, config.secret, {
      expiresIn: 86400 // expire en 24 heures
    });
    res.status (200) .send ({auth:true, token: token});
  })
})



router.post('/authenticate',urlencodeParser, function(req, res) {
  Admin.find({Email:req.query.Email},function (err,result) {
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
         res.status(200).send({ auth: true, token: token ,admin:result[0]});


        }
      })
    }
  })
})



router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


module.exports= router
