const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/',userController.getAllUsers);
router.post('/signup',userController.addUser);
router.post('/login',userController.getUserByEmailAndPassword);
router.post('/forgot-password',userController.forgotPassword);
router.get('/getAllUsers',userController.getAllUsers);


module.exports = router;