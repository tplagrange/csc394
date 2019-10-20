var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports.getTasks = function(req, res) {
    console.log("Enter Get Tasks")
    if (!req.payload.exp) {
      console.log("Error Get Tasks")
      console.log(req.payload.exp)
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
        console.log("Entering Task Query")
      Task
        .find({}).lean()
        .exec(function(err, user) {
          res.status(200).json(user);
        });
        console.log("User Task Finished")
    }
};
