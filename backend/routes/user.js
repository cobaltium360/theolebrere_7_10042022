const express = require('express');

const router = express.Router();

const controllers = require('../controllers/user');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const joi = require('../middleware/joi_user')


router.put('/:id', multer, auth, joi, controllers.modifProfile);
router.delete('/:id/:delete', auth, controllers.delete);
router.get('/:id', auth, controllers.getOneUser);
router.get('/', auth, controllers.getAllUsers);



module.exports = router; 