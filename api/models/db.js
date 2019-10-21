var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/meanAuth';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);
autoIncrement.initialize(mongoose.connection)

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

// //Throw in some mock values
// var Task = mongoose.model('Task');

// var task1 = new Task({
//     assignedTo: 0,
//     description: "Think about a topic",
//     status: "In Progress",
//     reviewedBy: 1,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task1.save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task2 = new Task({
//     assignedTo: 0,
//     description: "Hit the Library",
//     status: "Done",
//     reviewedBy: 1,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task2.save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task3= new Task({
//     assignedTo: 0,
//     description: "Draft research paper",
//     status: "In Progress",
//     reviewedBy: 1,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task3.save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task4 = new Task({
//     assignedTo: 0,
//     description: "Get Peer Review",
//     status: "In Progress",
//     reviewedBy: 1,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task4.save(function (err, book) {
//   if (err) return console.error(err);
// });
//
// var task5 = new Task({
//     assignedTo: 0,
//     description: "Submit final draft",
//     status: "In Progress",
//     reviewedBy: 1,
//     dueDate: '2019-11-15',
//     rating: "5 stars"
// });
// task5.save(function (err, book) {
//   if (err) return console.error(err);
// });
