var mongoose = require( 'mongoose' );

// This is the mongoDB schema for the 'Task' model
var taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  assignedTo: Number,
  description: String,
  status: String,
  reviewedBy: Number,
  dueDate: Date,
  rating: Number
});

// userSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };
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
