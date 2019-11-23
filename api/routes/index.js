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
router.get('/chat/:pid', auth, ctrlProjects.getMessages);
router.patch('/chat/:pid', auth, ctrlProjects.patchMessages);

// task
router.patch('/task/:id', auth, ctrlTasks.patchDescription);

// tasks
router.get('/tasks/project/:pid', auth, ctrlTasks.getTasks);
router.post('/projects/tasks', auth, ctrlProjects.postTask)

// metrics
router.get('/metrics/user/:_id', auth, ctrlMetrics.getUserMetrics);
// router.get('/metrics/project/:_id', auth, ctrlMetrics.getProjectMetrics);

module.exports = router;
