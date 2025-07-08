import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  searchPosts,
  addComment,
  deleteComment
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, upload.single('featuredImage'), createPost);

router.route('/search').get(searchPosts);
router.route('/category/:categoryId').get(getPostsByCategory);

router.route('/:id')
  .get(getPost)
  .put(protect, upload.single('featuredImage'), updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment)
  .delete(protect, deleteComment);

export default router;