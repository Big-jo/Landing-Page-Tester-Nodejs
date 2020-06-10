var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv');
var awis = require('awis');

let connectDB = require('./config/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
dotenv.config({ path: './config/config.env' });

connectDB();
var app = express();
var client = awis({
  key: process.env.AWSACCESSKEYID,
  secret: process.env.AWSSECRETACCESSKEY,
});

client(
  {
    Action: 'UrlInfo',
    Url: 'foo.com',
    ResponseGroup: 'Related,TrafficData,ContentData',
  },
  function (err, data) {
    // ...
  }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
