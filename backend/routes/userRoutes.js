const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// * REGISTER
// * =========
router.route('/register').post(userController.register);

// * LOGIN
// * =======
router.route('/login').post(userController.login);

module.exports = router;
