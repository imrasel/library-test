const Book = require('../models/book');

module.exports.getById = async id => {
  let book;
  
  try {
    book = await Book.findById(id);
  } catch(err) {
    return {
      error: true,
      message: err
    };
  }

  return book || {};
}

module.exports.create = async (data) => {
  const book = new Book(data);

  try {
    await book.save();
  } catch (err) {
    return {
        error: true,
        message: err
    };
  }

  return book;
}

module.exports.get = async () => {

  let books = [];
  try {
    books = await Book.find();
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }

  return books;
}

module.exports.update = async (data, id) => {
  let book;
  if (!await Book.findById(id)) {
    return {
      error: true,
      message: 'Book not found'
    };
  }
  try {
    book = Book.updateOne({ _id: id }, data);
  } catch (err) {
    return {
        error: true,
        message: err
    };
  }

  return book;
}

module.exports.updateAll = async (data) => {
  let book;

  try {
    book = Book.updateMany({}, data);
  } catch (err) {
    return {
        error: true,
        message: err
    };
  }

  return book;
}

module.exports.delete = async (id) => {
  let book;
  if (!await Book.findById(id)) {
    return {
      error: true,
      message: 'Book not found'
    };
  }
  try {
    book = Book.deleteOne({ _id: id });
  } catch (err) {
    return {
        error: true,
        message: err
    };
  }

  return book;
}
