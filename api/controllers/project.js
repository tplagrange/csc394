var mongoose  = require('mongoose');
var Project   = mongoose.model('Project');
var User      = mongoose.model('User');
var Task      = mongoose.model('Task');
var LightUser = mongoose.model('LightUser');

module.exports.getProjects = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
      // Create placeholder return array (will store all projects)
      var projects = new Array();
      // Get the user with the id needed
      var userToUpdate = User
            .findById(req.params.userid)
            .lean()
            .populate('projects')
            .exec( function(err, user) {
                if (!user) {
                    res.status(404).json("No user found");
                }
                res.status(200).json(user.projects);
            })

  }
};

module.exports.postProject = function(req, res) {
    if (!req.payload.exp) {
        res.status(401).json({
            "message" : "UnauthorizedError: private data"
      });
    } else {
        console.log(req.body)
        var proj = new Project();
        proj.name = req.body.name;
        proj.taskIDs = new Array();
        proj.users = new Array();

        var user = new LightUser();
        user.id = req.body.uid
        user.name = req.body.uname,
        user.email = req.body.uemail
        proj.users.push(user)

        console.log(proj)
        proj.createdBy = req.body.user;
        proj.save(function (err, savedProject) {
            res.status(200).json(savedProject);
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
      var project = Project
            .findById(req.params.pid)
            .lean()
            .exec( (err, project) => {
                if (err) {
                    res.status(500).json(err)
                }
                res.status(200).json(project.messages);
            })
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
                .findById(req.params.pid)
                .exec(function(err, project) {
                    project.messages.push(req.body)
                    project.save()
                    res.status(200).json(project);
                })
    }
}

module.exports.postTask = function(req, res) {
    if (!req.payload.exp) {
        res.status(401).json({
            "message" : "UnauthorizedError: private data"
        });
    } else {
        var nt = new Task();
        nt._id = mongoose.Types.ObjectId();
        nt.assignedTo = req.body.user;
        nt.description = "New Task";
        nt.status = "To-Do";
        // nt.dueDate = new Date();

        nt.save(function(err, savedTask) {
            if (err) {
                console.error(err);
            }
            res.status(200).json(savedTask);
        });
        var projectToUpdate = Project
                .findById(req.body.proj._id)
                .exec(function(err, project) {
                    project.taskIDs.unshift(nt._id);
                    project.save(function (err, savedProject) {
                        if (err) return console.error(err);
                    });
                })
    }
}
