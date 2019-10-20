var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports.getTasks = function(req, res) {
    if (!req.payload.exp) {
      console.log(req.payload.exp)
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
      Task
        .find({}).lean()
        .exec(function(err, user) {
          // console.log(user)
          res.status(200).json(user);
        });
    }
};
