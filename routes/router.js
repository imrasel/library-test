const express = require('express');
const app = express();

const usersRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const bookRoutes = require('./book.routes');

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

module.exports = app;
