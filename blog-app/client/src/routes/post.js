const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.js');
const postController = require('../controllers/postController.js');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/comments', auth, postController.addComment);

module.exports = router;
