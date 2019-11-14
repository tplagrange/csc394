var mongoose = require('mongoose');

// This is the mongoDB schema for the 'User' model
var userMetricsSchema = new mongoose.Schema({
    tasksClosed: {
        type: Number,
        min: 0
    }
});

mongoose.model('UserMetrics', userMetricsSchema);
