const express = require('express');

const router = express.Router();

const controllers = require('../controllers/auth');

const validator = require('../middleware/password-validator')


router.post('/signup', validator, controllers.signup);
router.post('/signin', controllers.signin);




module.exports = router;