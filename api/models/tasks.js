const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the mongoDB schema for the 'Task' model
var taskSchema = new mongoose.Schema({
  assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'name' }
  },
  description: String,
  status: String,
  reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'name' }
  },
  dueDate: Date,
  rating: String
});

taskSchema.plugin(require('mongoose-autopopulate'));

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
