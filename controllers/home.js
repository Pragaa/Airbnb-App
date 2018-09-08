var House = require('../models/houses');

module.exports = {
  
  'home' : function(req, res){
            House.find().sort({ "rating": 1}).limit(4)
            .populate({
              path: 'usere' , select : 'email'
            })
            .exec(  function(err, house){
              if (err){
                return console.log(err);
              }
              res.render("home.ejs" , {
                
                user : req.user, // vai buscar o user loggado a DB e injecta no ejs 
                message: req.flash('signupMessage'), //faz load da mensagem de signup
                house : house, //faz load de todas as casas da base de dados               
              }); 
          
            })
       
          },




}