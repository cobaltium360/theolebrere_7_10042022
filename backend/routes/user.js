const express = require('express');

const router = express.Router();

const controllers = require('../controllers/user');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.put('/:id', multer, auth, controllers.modifProfile);
router.delete('/:id/:delete', auth, controllers.delete);
router.get('/:id', auth, controllers.getOneUser);
router.get('/', auth, controllers.getAllUsers);



module.exports = router; 