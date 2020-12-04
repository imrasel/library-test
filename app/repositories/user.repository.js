const HttpError =  require('../models/httpError');
const User = require('../models/user');

module.exports.create = async (data) => {
  const user = User(data);

  try {
    await user.save();
  } catch (err) {
    return {
        error: true,
        message: err
    };
  }

  return user;
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

