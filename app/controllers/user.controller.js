const { validationResult  } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError =  require('../models/httpError');
const User = require('../models/user');
const  userRepository  = require('../repositories/user.repository');

module.exports.create = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) res.status(422).json(validationResult(req));

  const { name, password, email, role } = req.body;

  // check user exists
  if (await userRepository.getByQuery({ email: email })) return next(new HttpError('User already exists', 422));

  // create hashed passwword
  let hashedPasssword;
  hashedPasssword = await bcrypt.hash(password, 12);

  const data = {
    name,
    email,
    password: hashedPasssword,
    role,
  };

  let user = await userRepository.create(data);
  if (user.error) {
    return next(new HttpError(user.message, 500));
  }
  res.status(201).json({error: false, data: user, message: 'User created successfully' });
}

module.exports.get = async (req, res, next) => {

  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ error: false, data: users });
}
