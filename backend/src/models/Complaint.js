// models/Complaint.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filePath: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Solved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);

export default Complaint;
