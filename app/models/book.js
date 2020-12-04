const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaModel = new Schema(
  {
    bookName: { type: String },
    author: { type: String },
    genre: { type: String },
    releaseDate: { type: String },
    bookImage: { type: String },
    active: { type: Boolean, default: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true
  }
);

schemaModel.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

module.exports = mongoose.model('Book', schemaModel);
