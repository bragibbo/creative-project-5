const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours in ms
  }
}))

const users = require('./routes/users');
const students = require('./routes/students');
const schedule = require('./routes/schedule');
app.use('/api/users', users.routes);
app.use('/api/students', students.routes);
app.use('/api/schedule', schedule.routes);

app.listen(3001, () => console.log("Server is listening on port 3001!"));