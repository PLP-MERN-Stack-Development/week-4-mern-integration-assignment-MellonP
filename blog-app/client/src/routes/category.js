const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.js');
const categoryController = require('../controllers/categoryController.js');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', adminAuth, categoryController.createCategory);
router.put('/:id', adminAuth, categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

module.exports = router;
