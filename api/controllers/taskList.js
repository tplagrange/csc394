var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports.getTasks = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Task
      .find()
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
