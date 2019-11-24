var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var Project = mongoose.model('Project');

module.exports.getTasks = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
        var projectToPull = Project
                .findById(req.params.pid)
                .exec(function(err, project) {
                    if (err) {
                        console.error(err)
                        res.status(404).json("No project found");
                    }
                    res.status(200).json(project.taskIDs);
                })
    }
};

module.exports.patchDescription = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
        console.log("Inside patch description")
        console.log(req.params.id)
        var taskToUpdate = Task
                .findById(req.params.id)
                .exec(function(err, task) {
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                    console.log("inside exec...")
                    task.description = req.body.description
                    task.save()
                    res.status(200).json(task);
        });
    }
}
