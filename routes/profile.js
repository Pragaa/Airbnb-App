var express = require('express'),
    isLoggedIn = require('../middleware/logged'),
    profileController = require('../controllers/profile'),
    router  = express.Router();



    /********************/
    /* Pagina de Perfil */
    /********************/
    router.get("/profile", isLoggedIn , profileController.profilePage);
    
   
      
    


    module.exports = router;