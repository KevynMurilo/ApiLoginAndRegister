const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');

router.get('/user/:id', checkToken, userController.getUserById);
router.post('/auth/register', userController.registerUser);
router.post('/auth/login', userController.loginUser);

module.exports = router;
