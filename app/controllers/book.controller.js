const HttpError =  require('../models/httpError');
const  bookRepository  = require('../repositories/book.repository');
const { validationResult  } = require('express-validator');
const { uploadImage } = require('../services/uploadImage');
const isBase64 = require('is-base64');

module.exports.get = async (req, res, next) => {
  let books = await bookRepository.get();
  if (books.error)  return next(new HttpError(user.message, 500));

  res.status(200).json({ error: false, data: books });
}

module.exports.getById = async (req, res, next) => {
  const  bookId = req.params.bookId;
  
  let book = await bookRepository.getById(bookId);
  if (book.error)  return next(new HttpError(book.message, 500));

  res.status(200).json({ error: false, data: book, message: 'Success' });
}


module.exports.create = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) res.status(422).json(validationResult(req));
  let { bookName, author, genre, releaseDate, bookImage } = req.body;

  const data = {
    bookName,
    author,
    genre,
    releaseDate,
  };

  if (bookImage) {
    let imageUrl = '';
    if (isBase64(bookImage, { mimeRequired: true })) {
      imageUrl = uploadImage(bookImage, '/images/books');
    } else {
      imageUrl = bookImage;
    }
    data.bookImage = imageUrl;
  }

  let book = await bookRepository.create(data);
  if (book.error) {
    return next(new HttpError(book.message, 500));
  }
  res.status(201).json({error: false, data: book, message: 'Book created successfully' });
}

module.exports.update = async (req, res, next) => {
  // throw new HttpError('Could not find');
  let bookId = req.params.bookId;

  let data = req.body;

  if (data.bookImage) {
    let imageUrl = '';
    if (isBase64(data.bookImage, { mimeRequired: true })) {
      imageUrl = uploadImage(bookImage, '/images/books');
    } else {
      imageUrl = data.bookImage;
    }
    data.bookImage = imageUrl;
  }

  let book = await bookRepository.update(data, bookId);
  if (book.error) {
    return next(new HttpError(book.message, 500));
  }

  res.status(200).json({ data: book, message: 'Book successfully updated' });
}

module.exports.updateStatus = async (req, res, next) => {
  // throw new HttpError('Could not find');
  let bookId = req.params.bookId;
  const { active } = req.body;
  let data = {};
  data.active = active;

  let book = await bookRepository.update(data, bookId);
  if (book.error) {
    return next(new HttpError(book.message, 500));
  }

  res.status(200).json({ data: book, message: 'Book successfully updated' });
}

module.exports.requestBooks = async (req, res, next) => {
  // throw new HttpError('Could not find');
  let bookId = req.params.bookId;

  let book;

  let data = {
    student: req.auth.id
  };

  if (bookId == 'all') {
    book = await bookRepository.updateAll(data);
  } else book = await bookRepository.update(data, bookId);

  if (book.error) {
    return next(new HttpError(book.message, 500));
  }

  res.status(200).json({ data: book, message: 'Book request successfull' });
}



module.exports.delete = async (req, res, next) => {
  let bookId = req.params.bookId;

  let book = await bookRepository.delete(bookId);
  if (book.error) {
    return next(new HttpError(book.message, 500));
  }

  res.status(200).json({ data: book, message: 'Book successfully deleted' });
}
