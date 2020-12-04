const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const bookController = require('../app/controllers/book.controller');
const auth = require('../app/middlewares/auth');
const permit = require('../app/middlewares/permission');
const { createValidation, updateValidation, statusValidation } = require('../app/validations/book.validation');



router.post('/', auth, permit('librarian'), createValidation, bookController.create);
router.post('/request/:bookId', auth, permit('student'), bookController.requestBooks);
router.get('/:bookId', auth, bookController.getById);
router.get('/', auth, bookController.get);
router.put('/:bookId', auth, permit('librarian'), updateValidation, bookController.update);
router.put('/status/:bookId', auth, permit('librarian'), statusValidation, bookController.updateStatus);
router.delete('/:bookId', auth, permit('librarian'), bookController.delete);

module.exports = router;
