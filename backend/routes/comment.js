const express = require('express');

const router = express.Router();

const controllers = require('../controllers/comment');


const auth = require('../middleware/auth');


router.post('/:idpost', auth, controllers.createComment);
router.put('/:id',auth, controllers.updateComment);
router.delete('/:id/:delete', auth, controllers.deleteComment);


module.exports = router;