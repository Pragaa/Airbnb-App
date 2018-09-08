var express = require('express'),
    locationController = require('../controllers/location'),
    router  = express.Router();




/*************************/
/* Criar uma localização */
/*************************/
router.post('/newLocation', locationController.newLocation);


/***********************************/
/* Redirecionar para a localização */
/***********************************/
router.post('/redirectTo', locationController.redirectTo);


/*************************/
/* Pagina da localização */
/*************************/
router.get('/s/:location/all', locationController.locationPage );




module.exports = router