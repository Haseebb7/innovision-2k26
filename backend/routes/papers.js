const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Paper = require('../models/Paper');
const { protect } = require('../middleware/auth');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Engine configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `paper-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  },
});

// Check file type (PDF only)
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/pdf';

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// @desc    Register a new paper presentation
// @route   POST /api/papers
// @access  Public
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file of your paper.' });
    }

    const {
      paperTitle,
      abstract,
      college,
      department,
      authorName,
      authorEmail,
      authorPhone,
      coAuthors,
      paymentMethod,
      transactionId,
    } = req.body;

    // Save relative URL path for downloading/viewing the PDF
    const pdfUrl = `/uploads/${req.file.filename}`;

    const paper = await Paper.create({
      paperTitle,
      abstract,
      college,
      department,
      authorName,
      authorEmail,
      authorPhone,
      coAuthors,
      pdfUrl,
      paymentMethod,
      transactionId,
    });

    res.status(201).json({
      message: 'Registration successful!',
      paper,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}, (error, req, res, next) => {
  // Catch Multer errors or other errors
  res.status(400).json({ message: error.message });
});

// @desc    Get all paper registrations
// @route   GET /api/papers
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const papers = await Paper.find({}).sort({ createdAt: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update paper registration
// @route   PUT /api/papers/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (paper) {
      paper.paperTitle = req.body.paperTitle || paper.paperTitle;
      paper.abstract = req.body.abstract || paper.abstract;
      paper.college = req.body.college || paper.college;
      paper.department = req.body.department || paper.department;
      paper.authorName = req.body.authorName || paper.authorName;
      paper.authorEmail = req.body.authorEmail || paper.authorEmail;
      paper.authorPhone = req.body.authorPhone || paper.authorPhone;
      paper.coAuthors = req.body.coAuthors !== undefined ? req.body.coAuthors : paper.coAuthors;
      paper.paymentMethod = req.body.paymentMethod || paper.paymentMethod;
      paper.transactionId = req.body.transactionId || paper.transactionId;
      paper.status = req.body.status || paper.status;

      const updatedPaper = await paper.save();
      res.json(updatedPaper);
    } else {
      res.status(404).json({ message: 'Paper registration not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete paper registration
// @route   DELETE /api/papers/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (paper) {
      // Optional: Delete the physical PDF file from the server
      const filePath = path.join(__dirname, '..', paper.pdfUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await paper.deleteOne();
      res.json({ message: 'Paper registration removed' });
    } else {
      res.status(404).json({ message: 'Paper registration not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
