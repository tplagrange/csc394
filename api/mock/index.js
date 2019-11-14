var cmt = require('./mockTasks');
var cmu = require('./mockUsers');

module.exports.create = function() {
    var mockUser = cmu.createMockUsers();
    cmt.createMockTasks(mockUser);
}
