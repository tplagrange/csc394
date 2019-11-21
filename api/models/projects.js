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
    files: String,
    quote: String,
    latitude: String,
    longitude: String,
    avatar: String
});

// This is the mongoDB schema for the 'Project' model
var projectSchema = new mongoose.Schema({
    name: String,
    tasksIDs: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    messages: [Message],
    metrics: {
        tasksOpened: Number,
        tasksActive: Number,
        tasksClosed: Number
    }
});

mongoose.model('Project', projectSchema);
