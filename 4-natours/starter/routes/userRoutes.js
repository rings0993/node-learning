const express = require('express');

const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authControllers');
const reviewController = require('./../controllers/reviewControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Following routes can only visit after login
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updateMyPassword);

router.get('/me', userController.getMe, userController.getUser);

router.patch('/updateMe', userController.updateMe);

// Following routes can only visit after loaded in as admin
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
