var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.DB_SECRET,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlTasks = require('../controllers/task');
var ctrlMetrics = require('../controllers/metric');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// tasks
router.patch('/tasks/:_id', auth, ctrlTasks.patchDescription);
router.get('/tasks', auth, ctrlTasks.getTasks);

// metrics
router.get('/metrics/user/:_id', auth, ctrlMetrics.getUserMetrics);

module.exports = router;
