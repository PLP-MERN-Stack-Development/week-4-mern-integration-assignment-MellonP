const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.js');
const userController = require('../controllers/userController.js');

router.get('/', adminAuth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', userController.createUser); // registration route (no auth)
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', adminAuth, userController.deleteUser);

module.exports = router;
