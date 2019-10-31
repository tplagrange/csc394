const mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/meanAuth';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

// Remove deprecation warnings
mongoose.set( 'useCreateIndex', true );
mongoose.set( 'useFindAndModify', false );
mongoose.set( 'useUnifiedTopology', true );

// Connect to the database
mongoose.connect(dbURI, { useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);

});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./users');
require('./tasks');

//Throw in some mock values
var Task = mongoose.model('Task');
//var tasks = new Array(0);

var task1 = new Task({
    assignedTo: '5dbb09d8008ded9426c0d5eb',
    description: "Think about a topic",
    status: "In Progress",
    reviewedBy: '5dbb09d8008ded9426c0d5eb',
    dueDate: '2019-11-15',
    rating: "5 stars"
});

task1
    .save(function (err, task) {
            if (err) return console.error(err);
});


// var task2 = new Task({
//     assignedTo: assignment,
//     description: "Hit the Library",
//     status: "Done",
//     reviewedBy: assignment,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task2
//     .populate('assignedTo')
//     .populate('reviewedBy')
//     .save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task3= new Task({
//     assignedTo: assignment,
//     description: "Draft research paper",
//     status: "In Progress",
//     reviewedBy: assignment,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task3
//     .populate('assignedTo')
//     .populate('reviewedBy')
//     .save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task4 = new Task({
//     assignedTo: assignment,
//     description: "Get Peer Review",
//     status: "In Progress",
//     reviewedBy: assignment,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task4
//     .populate('assignedTo')
//     .populate('reviewedBy')
//     .save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task5 = new Task({
//     assignedTo: assignment,
//     description: "Submit final draft",
//     status: "In Progress",
//     reviewedBy: assignment,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task5
//     .populate('assignedTo')
//     .populate('setReviewedBy')
//     .save(function (err, book) {
//   if (err) return console.error(err);
// });
