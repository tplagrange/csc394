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

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// projects
router.post('/project', auth, ctrlProjects.postProject);
router.get('/projects/:userid', auth, ctrlProjects.getProjects);
// router.get('/project/:id')

// messages
router.get('/project/:id/messages', auth, ctrlProjects.getMessages);
router.patch('/project/:id/messages', auth, ctrlProjects.patchMessages);

// tasks
router.patch('/tasks/:_id', auth, ctrlTasks.patchDescription);
router.get('/tasks', auth, ctrlTasks.getTasks);

// metrics
router.get('/metrics/user/:_id', auth, ctrlMetrics.getUserMetrics);
// router.get('/metrics/project/:_id', auth, ctrlMetrics.getProjectMetrics);

module.exports = router;
