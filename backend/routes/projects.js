const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// @desc    Register a new project exhibition
// @route   POST /api/projects
// @access  Public
router.post('/', async (req, res) => {
  const {
    teamName,
    projectTitle,
    projectDescription,
    college,
    department,
    leaderName,
    leaderEmail,
    leaderPhone,
    members,
    paymentMethod,
    transactionId,
  } = req.body;

  try {
    const project = await Project.create({
      teamName,
      projectTitle,
      projectDescription,
      college,
      department,
      leaderName,
      leaderEmail,
      leaderPhone,
      members,
      paymentMethod,
      transactionId,
    });

    res.status(201).json({
      message: 'Registration successful!',
      project,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all project registrations
// @route   GET /api/projects
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update project registration
// @route   PUT /api/projects/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.teamName = req.body.teamName || project.teamName;
      project.projectTitle = req.body.projectTitle || project.projectTitle;
      project.projectDescription = req.body.projectDescription || project.projectDescription;
      project.college = req.body.college || project.college;
      project.department = req.body.department || project.department;
      project.leaderName = req.body.leaderName || project.leaderName;
      project.leaderEmail = req.body.leaderEmail || project.leaderEmail;
      project.leaderPhone = req.body.leaderPhone || project.leaderPhone;
      project.members = req.body.members || project.members;
      project.paymentMethod = req.body.paymentMethod || project.paymentMethod;
      project.transactionId = req.body.transactionId || project.transactionId;
      project.status = req.body.status || project.status;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project registration not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete project registration
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project registration removed' });
    } else {
      res.status(404).json({ message: 'Project registration not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
