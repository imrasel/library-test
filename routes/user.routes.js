const express = require('express');

const usersController = require('../app/controllers/user.controller');
const auth = require('../app/middlewares/auth');
const permit = require('../app/middlewares/permission');
const { createValidation } = require('../app/validations/user.validation');

const router = express.Router();

router.post('/', createValidation, usersController.create);
router.get('/', auth, permit('librarian'), usersController.get);

module.exports = router;
