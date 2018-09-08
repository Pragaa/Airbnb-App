var mongoose = require('mongoose');

/****************/
/* Criar Schema */
/****************/
// cria o esquema que o objecto que vai passar para a base de dados ira ter
var houseSchema = new mongoose.Schema({
  name: String,
  beds: String,
  price: String,
  rating: String,
  images : [],
  location : String,
  usere: { type: mongoose.Schema.Types.ObjectId, ref: "User" } //a referência das casas
});
var House = mongoose.model("House", houseSchema);

module.exports = House;