var express = require('express'),
    homeController = require('../controllers/home'),
    router  = express.Router();



/************/
/* HomePage */
/************/
router.get('/', homeController.home);








module.exports = router;