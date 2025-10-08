// import Complaint from '../models/Complaint.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
 
// // Multer stores path as relative, adjust if needed
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 

// export const submitComplaint = async (req, res) => {
//   try {
//     const { location, reason} = req.body;
//     const userid= req.params.userid;
//     const file = req.file;
// console.log("params" ,userid)   

//     if (!file) return res.status(400).json({ error: "File is required" });

//     const newComplaint = new Complaint({
//       userid : userid,
//       filePath: file.path,
//       location,
//       reason
//     });

//     await newComplaint.save();
//     res.status(201).json({ message: "Complaint submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// // Get all complaints with user details populated
// export const getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find()
//       .sort({ createdAt: -1 })
//       .populate('userid', 'fullname email mobile');

//     // Log each complaint's user details
//     complaints.forEach(c => console.log(c.userid));
//     res.status(200).json(complaints);
//   } catch (err) {
//     console.error("Error fetching complaints:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Get complaint by ID (optional)
// export const getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id).populate('u', 'fullname email mobile');
//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }
//     res.status(200).json(complaint);
//   } catch (err) {
//     console.error("Error fetching complaint:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// import Complaint from '../models/Complaint.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
 
// // Multer stores path as relative, adjust if needed
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 

// export const submitComplaint = async (req, res) => {
//   try {
//     const { location, reason} = req.body;
//     const userid= req.params.userid;
//     const file = req.file;
// console.log("params" ,userid)   

//     if (!file) return res.status(400).json({ error: "File is required" });

//     const newComplaint = new Complaint({
//       userid : userid,
//       filePath: file.path,
//       location,
//       reason
//     });

//     await newComplaint.save();
//     res.status(201).json({ message: "Complaint submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// // Get all complaints with user details populated
// export const getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find()
//       .sort({ createdAt: -1 })
//       .populate('userid', 'fullname email mobile');

//     // Log each complaint's user details
//     complaints.forEach(c => console.log(c.userid));
//     res.status(200).json(complaints);
//   } catch (err) {
//     console.error("Error fetching complaints:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Get complaint by ID (optional)
// export const getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id).populate('u', 'fullname email mobile');
//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }
//     res.status(200).json(complaint);
//   } catch (err) {
//     console.error("Error fetching complaint:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



import Complaint from '../models/Complaint.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Multer stores path as relative, adjust if needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Submit Complaint
export const submitComplaint = async (req, res) => {
  try {
    const { location, reason } = req.body;
    const userid = req.params.userid;
    const file = req.file;

    console.log("params", userid);

    if (!file) return res.status(400).json({ error: "File is required" });

    const newComplaint = new Complaint({
      userid: userid,
      filePath: file.filename,
      location,
      reason,
      status: "Pending",
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Complaints with user details populated
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('userid', 'fullname email mobile');

    complaints.forEach(c => console.log(c.userid));
    res.status(200).json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Complaint By ID
export const getComplaintById = async (req, res) => {
  console.log("Fetching complaint with ID:", req.params.id);
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userid', 'fullname email mobile');
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    console.log(complaint);
    res.status(200).json(complaint);
  } catch (err) {
    console.error("Error fetching complaint:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Complaint Status (New method added here)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Solved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated successfully", complaint: updatedComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }};              