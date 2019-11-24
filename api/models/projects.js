var mongoose = require('mongoose');

// The messages schema will remain embedded in the Project Schema
var Message = new mongoose.Schema({
    type: String,
    text: String,
    reply: String,
    user: {
        name: String,
        avatar: String,
    },
    date: String,
    quote: String,
    latitude: String,
    longitude: String,
    avatar: String
});

var LightUser = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
})

// This is the mongoDB schema for the 'Project' model
var projectSchema = new mongoose.Schema({
    name: String,
    taskIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        autopopulate: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    users: [LightUser],
    messages: [Message],
    metrics: {
        tasksOpened: Number,
        tasksActive: Number,
        tasksClosed: Number
    }
});

projectSchema.plugin(require('mongoose-autopopulate'));

mongoose.model('LightUser', LightUser);
mongoose.model('Project', projectSchema);
