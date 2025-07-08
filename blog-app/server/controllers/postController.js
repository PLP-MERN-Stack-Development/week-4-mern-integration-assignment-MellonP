import Post from '../models/Post.js';
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const search = req.query.search;

  let query = { status: 'published' };

  if (category) {
    query.categories = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  const options = {
    page,
    limit,
    sort: { createdAt: -1 },
    populate: [
      { path: 'categories', select: 'name slug' },
      { path: 'author', select: 'name avatar' }
    ]
  };

  const posts = await Post.paginate(query, options);

  res.json({
    success: true,
    ...posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('categories', 'name slug')
    .populate('author', 'name avatar')
    .populate('comments.user', 'name avatar');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.json({
    success: true,
    data: post
  });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { title, content, excerpt, categories, status } = req.body;

  let featuredImage = {};
  if (req.file) {
    featuredImage = {
      public_id: req.file.public_id,
      url: req.file.url
    };
  }

  const post = new Post({
    title,
    content,
    excerpt,
    featuredImage,
    categories: JSON.parse(categories),
    author: req.user._id,
    status
  });

  const createdPost = await post.save();
  
  res.status(201).json({
    success: true,
    data: createdPost
  });
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if the user is the author or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }

  const { title, content, excerpt, categories, status } = req.body;

  let featuredImage = post.featuredImage;
  if (req.file) {
    featuredImage = {
      public_id: req.file.public_id,
      url: req.file.url
    };
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.excerpt = excerpt || post.excerpt;
  post.featuredImage = featuredImage;
  post.categories = categories ? JSON.parse(categories) : post.categories;
  post.status = status || post.status;

  const updatedPost = await post.save();
  
  res.json({
    success: true,
    data: updatedPost
  });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if the user is the author or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }

  await post.remove();
  
  res.json({
    success: true,
    message: 'Post removed'
  });
});

// @desc    Get posts by category
// @route   GET /api/posts/category/:categoryId
// @access  Public
export const getPostsByCategory = asyncHandler(async (req, res) => {
  const posts = await Post.find({ 
    categories: req.params.categoryId,
    status: 'published'
  })
    .populate('categories', 'name slug')
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: posts
  });
});

// @desc    Search posts
// @route   GET /api/posts/search
// @access  Public
export const searchPosts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } }
    ],
    status: 'published'
  })
    .populate('categories', 'name slug')
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: posts
  });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = {
    user: req.user._id,
    text
  };

  post.comments.push(comment);
  await post.save();

  res.status(201).json({
    success: true,
    data: post.comments
  });
});

// @desc    Delete comment from post
// @route   DELETE /api/posts/:id/comments
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Find the comment
  const comment = post.comments.find(
    comment => comment._id.toString() === commentId.toString()
  );

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  // Check if the user is the comment author or admin
  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this comment');
  }

  // Remove the comment
  post.comments = post.comments.filter(
    comment => comment._id.toString() !== commentId.toString()
  );

  await post.save();

  res.json({
    success: true,
    data: post.comments
  });
});