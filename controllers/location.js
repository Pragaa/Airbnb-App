var Location = require('../models/location');

module.exports = {

  'redirectTo' : function(req, res) {
    var rota = req.body.rota;
    if(rota !== ""){
      res.redirect('/s/' + rota + '/all');
    }
    else {
      res.redirect('/');
    }  
  },

  
  'newLocation' : function(req,res){
                    //caso o form esteja vaziu ele redireciona para a mesma pagina
                    var localização = req.body.location
                    if ( localização !== ""){
                      //constructor de um objecto Location
                      var location = new Location ({
                        location: req.body.location
                      });
                      //grava o objecto criado na base de dados 
                      location.save( function(err, location){
                        if (err){
                        return console.log(err);
                      }
                    });
                    //redireciona para a pagina cuja localização foi introduzida
                    //res.redirect('/s/' + location.location + '/all');
                    res.redirect('/profile');
                  }
                  res.redirect('/profile');
                  },
                  
  

  'locationPage' : function(req,res){                
                  //Procura na base de dados se existe uma localização 
                  Location.findOne({ location: req.params.location })
                  //retrieves the houses referenced to that location from another db
                  .populate({
                    path : 'houses',
                    populate : {path : 'usere' , select: 'email' } 
                  })
                  //executes this code once everything is queried from the database
                  .exec(function(err, location) {
                    if (err) return handleError(err); //caso exista um erro na base de dados ele faz print do erro
                    
                    else {

                      

                      if (location !== null && typeof location !== 'null'){  
                        res.render('location.ejs' , { 
                          location : location,
                          user : req.user,
                          message: req.flash('signupMessage'),
                        });
                      } else {
                        res.redirect('/');
                      }
                    } 
                  });

                  

                }


};