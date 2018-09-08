var express = require('express'),
    router  = express.Router(),
    emptyForm = require('../middleware/emptyForm'),
    passport = require('passport');




/*********************/
/* Pedido de Registo */
/*********************/
router.post('/register', emptyForm , passport.authenticate('local-signup', {
  successRedirect : 'back', // redirect to the secure profile section
  failureRedirect : 'back', // redirect back to the signup page if there is an error
  failureFlash : true, // allow flash messages
}));



/*******************/
/* Pedido de LogIn */
/*******************/
router.post('/login', emptyForm , passport.authenticate('local-login', {
  successRedirect : 'back', // redirect to the secure profile section
  failureRedirect : 'back', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


/********************/
/* Pedido de LogOut */
/********************/

router.get("/logout", (req,res) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;