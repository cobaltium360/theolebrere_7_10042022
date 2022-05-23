const express = require('express');

const router = express.Router();

const controllers = require('../controllers/admin');


const auth = require('../middleware/auth');


router.put('/:iduser/:optionupdo', auth, controllers.createAdmin);


module.exports = router;