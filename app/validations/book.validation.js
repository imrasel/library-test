const { body, check } = require('express-validator');

module.exports.createValidation = [
  check('bookName').not().isEmpty().withMessage('Book Name is required'),
  check('author').not().isEmpty().withMessage('Author is required'),
  check('genre').not().isEmpty().withMessage('Genre is required'),
  check('releaseDate').not().isEmpty().withMessage('Release Date is required'),
  // check('bookImage').not().isEmpty().withMessage('Release Date is required'),
];

module.exports.updateValidation = [
  check('bookName').not().isEmpty().withMessage('Book Name is required'),
  check('author').not().isEmpty().withMessage('Author is required'),
  check('genre').not().isEmpty().withMessage('Genre is required'),
  check('releaseDate').not().isEmpty().withMessage('Release Date is required'),
];

module.exports.statusValidation = [
  check('status').not().isEmpty().withMessage('Status is required'),
];