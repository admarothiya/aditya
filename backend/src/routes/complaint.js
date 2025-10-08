// import {Router} from 'express';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { submitComplaint ,getAllComplaints, getComplaintById} from '../controllers/complaint.js';
 
// const router = Router();
 
// // Handle __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 
// // Upload config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   }
// });
 
// const upload = multer({ storage });
 
// router.post('/create/:userid', upload.single('file'), submitComplaint);
// router.get('/get-all', getAllComplaints);
// router.get('/get/:id', getComplaintById);

 
// export default router;




import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { submitComplaint, getAllComplaints, getComplaintById, updateComplaintStatus } from '../controllers/complaint.js';

const router = Router();

// Handle __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Routes
router.post('/create/:userid', upload.single('file'), submitComplaint);
router.get('/get-all', getAllComplaints);
router.get('/get/:id', getComplaintById);
router.put('/update-status/:id', updateComplaintStatus);

export default router;

