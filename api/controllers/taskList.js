var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports.getTasks = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
      Task
        .find({})
        .exec(function(err, task) {
          res.status(200).json(task);
        });
    }
};

module.exports.patchDescription = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
        var taskToUpdate = Task
                .findById(req.body._id)
                .exec(function(err, task) {
                    task.description = req.body.description
                    task.save()
                    res.status(200).json(task);
        });
    }
}
