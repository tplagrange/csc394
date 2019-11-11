const mongoose = require('mongoose');

module.exports.createMockTasks = function() {
    //Throw in some mock values
    var User = mongoose.model('User');

    //var tasks = new Array(0);
    var users = User
            .find({})
            .exec(function(err, users) {
                console.log(users[0]);
                saveTaskObjects(users[0])
    });
}

function saveTaskObjects(user) {
    var Task = mongoose.model('Task');
    var task1 = new Task({
        assignedTo: user._id,
        description: "Think about a topic",
        status: "In Progress",
        reviewedBy: user._id,
        dueDate: '2019-11-15',
        rating: "5 stars"
    });

    task1
        .save(function (err, task) {
                if (err) return console.error(err);
    });
}

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
