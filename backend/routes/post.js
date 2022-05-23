const express = require('express');

const router = express.Router();

const controllers = require('../controllers/post');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.post('/', auth, multer, controllers.createPost);
router.delete('/:id/:delete', auth, controllers.deletePost);
router.get('/', auth, controllers.getAllPost);
router.get('/:id', auth, controllers.getOnePost );
router.put('/:id',auth, controllers.updatePost);


module.exports = router;