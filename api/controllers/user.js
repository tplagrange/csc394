var mongoose = require('mongoose');
var User     = mongoose.model('User');

module.exports.patchUser = function(req, res) {
    if (!req.payload.exp) {
        res.status(401).json({
            "message" : "UnauthorizedError: private data"
        });
    } else {
        var userToUpdate = User
                .findById(req.params.userid)
                .exec(function(err, user) {
                    user.projects.push(req.body)
                    user.save()
                    res.status(200).json(user);
                    //To-Do add error handler
                    if (err) {
                        console.error(err);
                    }
        });
    }
}
