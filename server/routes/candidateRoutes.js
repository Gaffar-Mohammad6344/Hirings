// // import express from 'express';
// // import multer from 'multer';
// // import path from 'path';
// // // Note: Ensure your controller also uses ESM exports (see step 2)
// // import { applyNow, getAllCandidates} from '../controllers/candidateController.js';

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads/');
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });

// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype === 'application/pdf') {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Invalid file type. Only PDF is allowed'), false);
// //   }
// // };

// // const upload = multer({ storage: storage, fileFilter: fileFilter });

// // router.post('/apply', upload.single('resume'), applyNow);
// // router.get('/', getAllCandidates);

// // export default router; // Fixes the SyntaxError



// import express from 'express';
// import multer from 'multer';
// import Candidate from '../models/Candidate.js';
// import { 
//   deleteCandidate 
// } from '../controllers/candidateController.js';
// const router = express.Router();

// // MULTER CONFIG (for resume uploads)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// // 1. Apply Route
// router.post('/apply', upload.single('resume'), async (req, res) => {
//   try {
//     const { name, email, phone, message, skills, role } = req.body;
//     const newCandidate = new Candidate({
//       name, email, phone, message,
//       skills: JSON.parse(skills),
//       role: role || "Frontend Developer",
//       resumePath: req.file.path
//     });
//     await newCandidate.save();
//     res.status(201).json({ success: true, message: "Applied!" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 2. Get All Candidates
// router.get('/', async (req, res) => {
//   try {
//     const candidates = await Candidate.find().sort({ createdAt: -1 });
//     res.status(200).json(candidates);
//   } catch (err) {
//     res.status(500).json({ message: "Error" });
//   }
// });

// // --- FIXED: STATUS UPDATE ROUTE ---
// // This matches: PATCH http://localhost:5000/api/candidates/:id/status
// router.patch('/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Candidate.findByIdAndUpdate(
//       req.params.id, 
//       { status }, 
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: "Candidate not found" });
//     res.status(200).json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// router.delete('/:id', deleteCandidate);  

// export default router;




import express from "express";
import multer from "multer";
import fs from "fs";
import Candidate from "../models/Candidate.js";
import { 
  deleteCandidate ,applyNow
} from '../controllers/candidateController.js';
const router = express.Router();

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const candidate = new Candidate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      message: req.body.message,
      skills: JSON.parse(req.body.skills),
      resumePath: req.file.path,
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: candidate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      createdAt: -1,
    });

    res.json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete('/:id', deleteCandidate); 
router.post("/", applyNow); 
export default router;