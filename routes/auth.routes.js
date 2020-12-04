const express = require('express');
const { check } = require('express-validator');

const authController = require('../app/controllers/auth.controller');
const auth = require('../app/middlewares/auth');
const { loginValidation } = require('../app/validations/auth.validation');

const router = express.Router();

router.post('/login', loginValidation, authController.login);

// router.use(auth);

module.exports = router;
