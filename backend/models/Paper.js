const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema(
  {
    paperTitle: {
      type: String,
      required: true,
      trim: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    authorEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    authorPhone: {
      type: String,
      required: true,
      trim: true,
    },
    coAuthors: {
      type: String, // String listing co-authors (e.g., "Jane Doe, John Smith")
      trim: true,
      default: '',
    },
    pdfUrl: {
      type: String,
      required: true, // The uploaded file path/URL
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['UPI', 'Bank Transfer', 'On-spot / Cash', 'Other'],
      default: 'UPI',
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Paper', paperSchema);
