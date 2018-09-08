var House = require('../models/houses'),
    User = require('../models/user'),
    Location = require('../models/location');


module.exports = {

  'newHouse' : function(req, res){
                  var name = req.body.name;
                  var beds = req.body.beds;
                  var price = req.body.price;
                  var images = req.body.images;
                  var localização = req.body.location;           
                  var usuario = req.user.email;

                  House.create({
                    name: name,
                    beds: beds,
                    price: price,
                    images: images,
                    location : req.body.location,
                    usere : req.user,
                    
                  }, function(err, house){ 
                    User.findOne({ 'email' :  usuario }, function(err, user) {
                      // if there are any errors, return the error
                      if (err)
                          return done(err);

                      //faz referencing para o user
                      user.houses.push(house);
                      user.save();
                      
                    })
                    Location.findOne({location: localização }, function(err, location){
                      if(err){
                        console.log(err);
                      }
                     
                      //faz referencing para a localização
                      location.houses.push(house);
                      location.save(); 
                   
                      res.redirect('/profile');
                      
                    }) 
                  });
                },

  'housePage' : function(req , res){
                  //procura na base de dados a casa com este id 
                  House.findOne({ _id : req.params.id})
                  .populate({ path: 'usere', select: 'email avatar' })
                  .exec( function(err, house){
                  if (err){
                    return console.log(err);
                  }

                    res.render('house', { 
                      house : house,
                      user : req.user,
                      message: req.flash('signupMessage'),
                    });
                  })
                },
  
  "updateHouse" : function(req ,res){
                    //procura na base de dados a casa com este id
                    House.findByIdAndUpdate({ _id : req.params.id}, 
                      { $set: { name: req.body.name, beds: req.body.beds , price: req.body.price }} , function(err){
                        if (err) return handleError(err);

                        res.redirect('/profile');
                    })
                  },


  "deleteHouse" : function(req ,res){
                    //procura o user que está logado e retira o id da casa da sua DB
                    User.findOneAndUpdate({ 'email' : req.user.email },
                       { $pull: { houses :  req.params.id}}, function(err){
                        if (err) return handleError(err);
                    })
                    //procura a localização da casa e retira o id da casa da sua DB                  
                    Location.findOneAndUpdate({ location : req.body.location },
                       { $pull: { houses :  req.params.id}}, function(err){
                        if (err) return handleError(err);
                    })
                    //procura na base de dados a casa com este id
                    House.findByIdAndRemove({ _id : req.params.id}, function(err){
                        if (err) return handleError(err);

                        res.redirect('/profile');
                    })
                  }
}