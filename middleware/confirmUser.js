var House = require('../models/houses');

/******************************************************/
/* Middleware que verifica se é o user a fazer update */
/******************************************************/
module.exports = function(req,res, next){
  // 
  House.findOne({ '_id' : req.params.id})
  .exec( function(err, house){
    if (err){ return console.log(err); }

    var houseUser = JSON.stringify(house.usere);
    var sessionUser = JSON.stringify(req.user._id);

    if ( houseUser === sessionUser) {
      return next();
    }
    else {
      res.redirect('back'); //neste momento a app está a crashar e isto não chega a correr
    }

  })
  




  
    
  

  

}