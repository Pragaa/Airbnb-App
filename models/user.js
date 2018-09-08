// Encrypt das passwords / interacção com a DB
var mongoose = require("mongoose"),
    bcrypt   = require('bcrypt-nodejs');



var userSchema = new mongoose.Schema({

    
      email        : String,
      password     : String,
      avatar: String,
      houses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }] //a referência é a casa
      



  });


  //metodo para gerar uma hash
  userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };



  // faz um constructor que inicia quando chamada a variavel Casa
  var User = mongoose.model("User", userSchema);


  module.exports = User;