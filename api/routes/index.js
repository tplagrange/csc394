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
router.patch('/projects/:pid', auth, ctrlProjects.patchProject);

// messages
router.get('/chat/:pid', auth, ctrlProjects.getMessages);
router.patch('/chat/:pid', auth, ctrlProjects.patchMessages);

// task
router.patch('/tasks/:id', auth, ctrlTasks.patchTask);

// tasks
router.get('/tasks/project/:pid', auth, ctrlTasks.getTasks);
router.post('/projects/tasks', auth, ctrlProjects.postTask);

// user
router.get('/users/:userid', auth, ctrlUsers.getUser);

// metrics
router.get('/metrics/:pid', auth, ctrlProjects.getMetrics);
// router.get('/metrics/user/:uid', auth, ctrlUsers.getMetrics);

module.exports = router;
