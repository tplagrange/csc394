var mongoose = require('mongoose');
var Project  = mongoose.model('Project');
var User     = mongoose.model('User');

module.exports.getProjects = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
      // Create placeholder return array (will store all projects)
      var projects = new Array();
      // Get the user with the id needed
      User.findByID(req.params.id)
            .exec(function(err, user) {
                // Get the array of project IDs the user has access to
                for (var id of user.projects) {
                    var project = Project
                            .findByID(id)
                            .exec(function(err, proj) {
                                // Add each to the return array
                                projects.push(proj);
                            });
                }
                res.status(200).json(projects);
            });
  }
};

// For now, just a placeholder that creates a project from hardcoded vars
module.exports.postProject = function(req, res) {
    if (!req.payload.exp) {
        res.status(401).json({
            "message" : "UnauthorizedError: private data"
      });
    } else {
        console.log("Going to save");
        var proj = new Project();
        proj.name = req.body.proj.name;
        proj.taskIDs = new Array();
        proj.createdBy =req.body.user;
        proj.save(function (err, task) {
                res.status(200).json(proj);
                if (err) return console.error(err);
        });
    }
}

module.exports.getMessages = function(req, res) {
    if (!req.payload.exp) {
        res.status(401).json({
            "message" : "UnauthorizedError: private data"
      });
    } else {
      // Get all the messages
      console.log("Getting messages");
    }
};

module.exports.patchMessages = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
        // Push to the message array
        var projectToUpdate = Project
                .findById(req.params.id)
                .exec(function(err, project) {
                    project.messages.push(req.body)
                    project.save()
                    res.status(200).json(project);
                })
    }
}
