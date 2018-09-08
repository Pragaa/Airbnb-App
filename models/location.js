var mongoose = require('mongoose');


/****************/
/* Criar Schema */
/****************/
// cria o esquema que o objecto que vai passar para a base de dados ira ter
var locationSchema = new mongoose.Schema({
  location: String,
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }] //a referência das casas
});
/***********************/
/* criar base de dados */
/***********************/
// faz um constructor que inicia quando chamada a variavel Casa
var Location = mongoose.model("Location", locationSchema);


module.exports = Location;