var mongoose = require('mongoose');
var User = mongoose.model('User')
var UserMetrics = mongoose.model('UserMetrics');

module.exports.getUserMetrics = function(req, res) {
    if (!req.payload.exp) {
      res.status(401).json({
        "message" : "UnauthorizedError: private data"
      });
    } else {
      User
        .findById(req.param._id)
        .exec(function(err, user) {
          UserMetrics
            .findById(User.metrics)
            .exec(function(err, metric) {
                res.status(200).json(metric);
            })
        });
    }
};
