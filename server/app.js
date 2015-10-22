// Express init
var express = require('express');
var app = express();

// other packages
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/interviewly_dev');

// require routes
var index = require('./routes/index');
var authenticate = require('./routes/authenticate');
var csvtojson = require('./routes/csvtojson');
var forgot = require('./routes/forgot');
var reset = require('./routes/reset');
var change = require('./routes/change');

// require APIs
var interviewer = require('./api/interviewer/interviewer');
var student = require('./api/student/student');
var users = require('./api/user');
var event = require('./api/event/event');
var schedule = require('./api/schedule/schedule');
var addInterviewerToEvent = require('./api/event/addInterviewer');
var addBulkInterviewersToEvent = require('./api/event/addBulkInterviewers');
var addStudentToEvent = require('./api/event/addStudent');
var addBulkStudentsToEvent = require('./api/event/addBulkStudents');
var getSchedule = require('./api/event/getSchedule');
var removeStudentFromEvent = require('./api/event/removeStudent');
var removeInterviewerFromEvent = require('./api/event/removeInterviewer');
var interviewerAddWeight = require('./api/interviewer/addWeight');
var studentAddWeight = require('./api/student/addWeight');
var interviewerUnavail = require('./api/interviewer/unavail');
var saveScheduleToEvent = require('./api/event/saveSchedule');
var archiveStudent = require('./api/student/archive');
var archiveInterviewer = require('./api/interviewer/archive');
var archiveEvent = require('./api/event/archive');
var interviewerResetWeight = require('./api/interviewer/resetWeight');

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'client/app/assets/img', 'favicon.png')));

// log stuff
app.use(logger('dev'));

// parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// serve client
app.use(express.static(path.join(__dirname, '..', 'client', 'app')));

// use routes
app.use('/', index);
app.use('/authenticate', authenticate);
app.use('/csvtojson', csvtojson);
app.use('/forgot', forgot);
app.use('/reset', reset);
app.use('/change', change);

// use APIs
app.use('/api/interviewer', interviewer);
app.use('/api/student', student);
app.use('/api/event', event);
app.use('/api/schedule', schedule);
app.use('/api/users', users);
app.use('/api/event/addInterviewer', addInterviewerToEvent);
app.use('/api/event/addStudent', addStudentToEvent);
app.use('/api/event/addBulkStudents', addBulkStudentsToEvent);
app.use('/api/event/addBulkInterviewers', addBulkInterviewersToEvent);
app.use('/api/event/removeInterviewer', removeInterviewerFromEvent);
app.use('/api/event/removeStudent', removeStudentFromEvent);
app.use('/api/event/getSchedule', getSchedule);
app.use('/api/interviewer/addWeight', interviewerAddWeight);
app.use('/api/interviewer/resetWeight', interviewerResetWeight);
app.use('/api/student/addWeight', studentAddWeight);
app.use('/api/interviewer/unavail', interviewerUnavail);
app.use('/api/event/saveSchedule', saveScheduleToEvent);
app.use('/api/student/archive', archiveStudent);
app.use('/api/interviewer/archive', archiveInterviewer);
app.use('/api/event/archive', archiveEvent);

// For testing
//app.use('*', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
