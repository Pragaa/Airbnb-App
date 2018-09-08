var Location = require('../models/location'),
    User = require('../models/user');

    

module.exports = {

  'profilePage' : function(req, res) { 
            
                  //Procura na base de dados pelo user que está logado 
                  User.findOne({ email : req.user.email})
                  //injecta as casas que pertencem ao user mas estão noutra DB
                  .populate('houses')       
                  //executa o codigo 
                  .exec( function(err, usuario){
                    
                      //acede a base de dados das localizações
                      Location.find().exec( function(err, location){
                      
                        //faz render de profile com as localizações
                        res.render("profile.ejs", {
                          user : usuario, // vai buscar o user loggado a DB e injecta no ejs 
                          location : location, // vai buscar as localizações que existem na base de dados de localizações
                          message: req.flash('signupMessage'), //envia flash messages
                        }); 
                      
                      })               
                           
                  })                                                 
                  },


}