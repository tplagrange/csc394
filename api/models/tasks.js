var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

// This is the mongoDB schema for the 'Task' model
var taskSchema = new mongoose.Schema({
  assignedTo: {
      type: Number, ref: 'User'
  },
  description: String,
  status: String,
  reviewedBy: {
      type: Number, ref: 'User'
  },
  dueDate: Date,
  rating: String
});

// Add the mongoose-auto-increment plugin to this schema
taskSchema.plugin(autoIncrement.plugin, 'Task')

taskSchema.methods.setAssignment = function(userID) {
    this.assignedTo = userID
}

taskSchema.methods.setDescription = function(description) {
    this.description = description

}

taskSchema.methods.setStatus = function(status) {
    this.status = status
}

taskSchema.methods.setReviewedBy = function(id) {
    this.reviewedBy = id
}

taskSchema.methods.setDueDate = function(date) {
    this.dueDate = date
}

taskSchema.methods.setRating = function(rating) {
    this.rating = rating
}

mongoose.model('Task', taskSchema);
