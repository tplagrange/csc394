const mongoose = require('mongoose');

module.exports.createMockUsers = function(mockUserID) {
    var User = mongoose.model('User');
    var UserMetrics = mongoose.model('UserMetrics');

    var user = new User();

    user.name = "Administrator"
    user.email = "noreply@madeup.com";

    user.setPassword("admin");

    var metricsModel = new UserMetrics();
    metricsModel.tasksClosed = 0;
    metricsModel.save(function(err, metric) {
       user.metrics = metric._id;
    });

    user.save(function(err) {
      if (err) return console.error(err);
      return user.metrics;
    });
}
