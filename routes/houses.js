var express = require('express'),
    housesController = require('../controllers/houses'),
    confirmUser = require('../middleware/confirmUser'),
    router  = express.Router();



/******************/
/* Criar uma Casa */
/******************/
router.post('/newHouse', housesController.newHouse );

/******************/
/* Update da Casa */
/******************/
router.put('/rooms/:id', confirmUser , housesController.updateHouse );


/******************/
/* Delete da Casa */
/******************/
router.delete('/rooms/:id/delete', confirmUser , housesController.deleteHouse );



/******************/
/* Pagina da Casa */
/******************/
router.get('/rooms/:id/', housesController.housePage );




module.exports = router