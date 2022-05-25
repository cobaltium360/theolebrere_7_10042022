const express = require('express');

const router = express.Router();

const controllers = require('../controllers/comment');


const auth = require('../middleware/auth');
const joi = require('../middleware/joi_comment')


router.post('/:idpost', auth, joi, controllers.createComment);
router.put('/:id',auth, joi, controllers.updateComment);
router.delete('/:id/:delete', auth, controllers.deleteComment);


module.exports = router;