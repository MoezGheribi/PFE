var express=require("express")
var cors=require('cors');
var mongoose = require('mongoose');

var Conducteurs=require('./router/Conducteurs');

var Messages=require('./router/Messages');

var Voyageurs=require('./router/Voyageurs');
var Admin=require('./router/admin');
var publication=require("./router/publication")


var app=express()
mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {

  if (err) throw err;

  console.log('Successfully connected');

});



app.use(cors())
app.use("/admin" , Admin)
app.use("/Conducteurs",Conducteurs)
app.use("/publications",publication)
app.use("/Messages",Messages)
app.use("/Voyageurs",Voyageurs)



app.listen(3000,function(){

  console.log("serveur en ecoute")
});
