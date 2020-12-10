


var express=require("express")
var mongoose = require('mongoose');
var config = require('../config');
var jwt = require('jsonwebtoken');
var Conducteurs=require("./../models/Conducteurs");
var Voyageurs=require("./../models/Voyageurs");
var VerifyToken  =require("./verifytoken");
var bodyparser= require('body-parser');
var bcrypt = require ('bcryptjs');
var urlencodeParser=bodyparser.urlencoded({extended:false})
var multer = require('multer');
var path = require('path');

var router=express.Router()

router.use(express.static(path.join(__dirname, 'uploads')));


var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
//
//   var admin1 = new Admin({
//     nom:'marwen',
//     prenom:'hh' ,
//     img:{
//       fieldname: req.files[0].fieldname,
//       originalname: req.files[0].originalname,
//       encoding: req.files[0].encoding,
//       mimetype: req.files[0].mimetype,
//       destination: req.files[0].destination,
//       filename: req.files[0].fieldname,
//       path: req.files[0].path,
//       size: req.files[0].size
//     }
//   })
//   admin1.save(function (err, result) {
//     if(err){
//       console.log(err)
//     }else{
//       console.log('okkkkkkk')
//       res.send(req.files[0]);
//
//
//     }
//   })
//
// });


router.use(express.static(__dirname + '/public'));


router.get('/uploads/:img',function (req,res) {

  console.log(__dirname+"/uploads/"+req.params.img);

  res.sendFile(__dirname+"/uploads/"+req.params.img)
})







router.post('/add' ,upload.array("uploads[]", 12),function (req,res) {

  console.log(req.files)

  Voyageurs.findById({_id:req.query._id} , function(err , result){


    var conducteur1 = new Conducteurs({
      Nom: result.Nom,
      Prenom: result.Prenom,
      Email:result.Email,
      Password: result.Password,
      Adresse: result.Adresse,
      NumTel: result.NumTel,
      CIN: result.CIN ,
     // permis:req.query.permis,
      permis:{
        fieldname: req.files[0].fieldname,
        originalname: req.files[0].originalname,
        encoding: req.files[0].encoding,
        mimetype: req.files[0].mimetype,
        destination: req.files[0].destination,
        filename: req.files[0].fieldname,
        path: req.files[0].path,
        size: req.files[0].size
      },

       publication:[]
    });

    conducteur1.save(function(err , user) {
      if (err) throw err;
      //res.send(JSON.stringify(result))

      console.log('Conducteur successfully saved.');
      // crée un token
      var token = jwt.sign ({id: user._id}, config.secret, {
        expiresIn: 86400 // expire en 24 heures
      });
      res.status (200) .send ({auth:true, token: token});
    })



  })

  // var hashedPassword = bcrypt.hashSync (req.query.Password, 12);
  // var conducteurs = new Conducteurs({
  //   Nom: req.query.Nom,
  //   Prenom: req.query.Prenom,
  //   Email:req.query.Email,
  //   Password: hashedPassword,
  //   Adresse: req.query.Adresse,
  //   NumTel: req.query.NumTel,
  //   publication:[]
  // });
  // conducteurs.save(function(err , user) {
  //   if (err) throw err;
  //   res.send(JSON.stringify(result))
  //
  //   console.log('Conducteur successfully saved.');
  //   // crée un token
  //   var token = jwt.sign ({id: user._id}, config.secret, {
  //     expiresIn: 86400 // expire en 24 heures
  //   });
  //   //res.status (200) .send ({auth:true, token: token});
  // })
})



router.get('/findbyemail', function(req,res){

console.log(req.query.Email)
  Conducteurs.find({Email: req.query.Email}).exec( function (err, result) {
    console.log(result.length)
    if (err) return res.status(500).send("There was a problem finding the conducteur.");
    if (result.length == null) {return res.status(200).send(result);}
    else{

    res.status(200).send(result);}
  });


})













router.get('/all', VerifyToken , function(req,res){
  // var token = req.headers['x-access-token'];
  // if (!token)
  //   return res.status(403).send({ auth: false, message: 'No token provided.' });
  // jwt.verify(token, config.secret, function(err,decoded) {
  //   if (err)
  //     return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //   // if everything good, save to request for use in other routes

    Conducteurs.find().exec( function (err, conducteur) {
      if (err) return res.status(500).send("There was a problem finding the conducteur.");
      if (!conducteur) return res.status(404).send("No conducteur found.");

      res.status(200).send(conducteur);});
 // });

})




router.post('/authenticate',urlencodeParser, function(req, res) {
  Conducteurs.find({Email:req.query.Email},function (err,result) {
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

// router.get('/me', function(req, res) {
//   var token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//
//   jwt.verify(token, config.secret, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//
//     //res.status(200).send(decoded);
//     Conducteurs.findById(decoded.id,{Password: 0}, function (err, conducteur) {
//       if (err) return res.status(500).send("There was a problem finding the conducteur.");
//       if (!conducteur) return res.status(404).send("No conducteur found.");
//
//       res.status(200).send(conducteur);
//       //next(conducteur); // add this line
//     });
//   });
// });



router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/refresh',function (req,res) {

  var token = jwt.sign({
    id:req.headers['id']
  }, config.secret);
  res.send({token : token})
})



router.get('/allbyid',VerifyToken, function(req,res){
  Conducteurs.findById({_id:req.query._id}).exec(function(err, result) {
    if (err) throw err;
    res .send(JSON.stringify(result))
    console.log(result);
  });
})
router.get('/allbyidupdate',VerifyToken , function(req,res){
  Conducteurs.findById({_id:req.query._id} , function(err, Conducteurs) {
    if (err) throw err;

    Conducteurs.Nom= req.query.Nom
    Conducteurs.save(function(err , result) {
      if (err) throw err;
      res.send(result)
      console.log(' Voyageurs updated successfully');
    });
  });

})


// router.get('/delete', function(req,res) {
//   var token = req.headers['x-access-token'];
//   if (!token)
//     return res.status(403).send({auth: false, message: 'No token provided.'});
//   jwt.verify(token, config.secret, function (err, decoded) {
//     if (err)
//       return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
//
//     req.userId = decoded.id;
//
//     Conducteurs.remove({_id: req.query._id}).exec(function (err, result) {
//         if (err) return res.status(500).send("There was a problem finding the conducteur.");
//         if (!conducteur) return res.status(404).send("No conducteur found.");
//
//         res.status(200).send(conducteur);
//       });
//
//
//   })
//
// })


router.get('/delete1', VerifyToken , function(req,res) {

  Conducteurs.remove({_id: req.query._id}).exec(function (err, result) {
      if (err) return res.status(500).send("There was a problem finding the conducteur.");
      if (!result) return res.status(404).send("No conducteur found.");

      res.status(200).send(result);
    });


})








router.get('/me', VerifyToken, function(req, res, next) {
  Conducteurs.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
})


module.exports = router





