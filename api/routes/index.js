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
var ctrlProjects = require('../controllers/project');
var ctrlUsers = require('../controllers/user');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// projects
router.post('/projects', auth, ctrlProjects.postProject);
router.get('/projects/:userid', auth, ctrlProjects.getProjects);
router.patch('/users/:userid', auth, ctrlUsers.patchUser);

// messages
router.get('/projects/:id/messages', auth, ctrlProjects.getMessages);
router.patch('/projects/:id/messages', auth, ctrlProjects.patchMessages);

// tasks
router.patch('/tasks/:_id', auth, ctrlTasks.patchDescription);
router.get('/tasks', auth, ctrlTasks.getTasks);

// metrics
router.get('/metrics/user/:_id', auth, ctrlMetrics.getUserMetrics);
// router.get('/metrics/project/:_id', auth, ctrlMetrics.getProjectMetrics);

module.exports = router;
