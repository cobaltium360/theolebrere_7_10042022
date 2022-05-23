const express = require('express');

const router = express.Router();

const controllers = require('../controllers/like');

const auth = require('../middleware/auth');

router.get('/:idpostlike/:idlike', auth, controllers.createlike);
router.delete('/:idpostunlike/:idunlike', auth, controllers.Unlike);

module.exports = router;


