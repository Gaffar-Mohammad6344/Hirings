


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