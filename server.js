require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/router');
const HttpError = require('./app/models/httpError');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('uploads/'));
app.use('/', routes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ error: true, message: error.message || 'An unknown error occured' });
});

mongoose.Promise = require('bluebird');
mongoose
  .connect(process.env.MONGODB_URL , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,  })
  .then((data) => {
    app.listen(port, () => {
      console.log('App listening on port ' + port);
    });
  })
  .catch(err => {
    console.log(err);
  });
