// import express from 'express';
// import {  submitContactForm } from '../controllers/contactController.js';

// const router = express.Router();

// // Matches: POST /api/contact/
// // router.post("/", createContact);

// // Matches: POST /api/contact/submit
// // router.post("/submit", submitContactForm);
// router.post("/", submitContactForm);

// export default router;


import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import Contact from '../models/Contact.js'; // 1. Change require to import and add .js

const router = express.Router();

// GET all contact/partner inquiries
// Note: If this is mounted as app.use('/api/contact', ...) in server.js, 
// the path here should just be '/'
router.get('/', async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE a contact inquiry
router.delete('/:id', async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST a new inquiry (Form submission)
router.post("/", submitContactForm);

export default router;