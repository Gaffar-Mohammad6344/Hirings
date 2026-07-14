// import Candidate from '../models/Candidate.js';
// import fs from 'fs';

// export const applyNow = async (req, res) => {
//   try {
//     const { name, email, phone, message, skills } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload a resume (PDF)" });
//     }

//     const parsedSkills = JSON.parse(skills);

//     const newCandidate = new Candidate({
//       name,
//       email,
//       phone,
//       message,
//       skills: parsedSkills,
//       resumePath: req.file.path,
//     });

//     await newCandidate.save();

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully!",
//       data: newCandidate
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAllCandidates = async (req, res) => {
//     try {
//       const candidates = await Candidate.find().sort({ createdAt: -1 });
//       res.status(200).json(candidates);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching candidates" });
//     }
// };
// export const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Candidate.findByIdAndUpdate(
//       req.params.id, 
//       { status }, 
//       { new: true }
//     );
//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// // 2. Delete Candidate Logic
// export const deleteCandidate = async (req, res) => {
//   try {
//     const candidate = await Candidate.findById(req.params.id);
//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });

//     // FIX: Check if file exists before trying to delete it
//     if (candidate.resumePath && fs.existsSync(candidate.resumePath)) {
//       fs.unlinkSync(candidate.resumePath);
//     }

//     await Candidate.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: "Deleted" });
//   } catch (error) {
//     console.error(error); // This helps you see the actual error in the terminal
//     res.status(500).json({ message: "Server Error" });
//   }
// }


// export const submitContactForm = async (req, res) => {
//   try {
//     const { fullName, email, message } = req.body;

//     // 1. Validation
//     if (!fullName || !email || !message) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

    
    
//     // 2. Save to Database
//     await Contact.create({ name: fullName, email, message });

//     // --- TEMPLATE 1: FOR THE USER (Confirmation) ---
//     const userHtml = `
//       <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 0;">
//         <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
//           <div style="margin-bottom: 30px;">
//              <span style="background: #071952; color: white; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 18px;">H</span>
//              <span style="font-size: 22px; font-weight: 800; color: #071952; margin-left: 8px;">Hirings</span>
//           </div>
//           <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 8px;">Thanks for contacting us!</h2>
//           <p style="color: #64748b; font-size: 15px; line-height: 24px; margin-bottom: 30px;">Hello ${fullName}, we have received your inquiry. Our team will get back to you within 24 hours.</p>
//           <div style="border: 2px dashed #f97316; border-radius: 16px; padding: 25px; background-color: #fffaf5;">
//             <p style="text-align: center; color: #f97316; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px;">Your Inquiry Details</p>
//             <p style="color: #071952; font-size: 14px; margin: 5px 0;"><strong>Message:</strong> "${message}"</p>
//           </div>
//           <div style="margin-top: 40px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px;">
//             <p style="color: #cbd5e1; font-size: 11px;">© 2025 Hirings Portal</p>
//           </div>
//         </div>
//       </div>
//     `;

        
//     // 3. SEND EMAIL TO THE USER
//     await sendEmail({
//       email: email,
//       subject: "We've received your inquiry - Hirings",
//       html: userHtml,
//     });


//     // 5. SUCCESS RESPONSE
//     return res.status(200).json({ 
//       success: true, 
//       message: "Form submitted and emails sent successfully!" 
//     });

//   } catch (error) {
//     console.error("CONTACT FORM ERROR:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Internal Server Error. Please try again later." 
//     });
//   }
// };


import Candidate from '../models/Candidate.js';
import fs from 'fs';
import sendEmail from '../utils/sendEmail.js';

export const applyNow = async (req, res) => {
  try {
    // 1. Log arrival
    console.log("--- STARTING CANDIDATE PROCESS ---");
    
    // Check if role and phone are extracted correctly from req.body
    const { name, email, phone, message, skills, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a resume (PDF)" });
    }

    console.log("Step 1: Data Extracted for:", name);

    // 2. Parse skills safely
    let parsedSkills = [];
    try {
      parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : skills;
    } catch (e) {
      console.log("Skill parsing failed, using raw value");
      parsedSkills = skills;
    }

    // 3. Create and Save Candidate
    // IMPORTANT: Make sure your Schema in models/Candidate.js has 'role' and 'phone' fields!
    const newCandidate = new Candidate({
      name,
      email,
      phone,
      role, 
      message,
      skills: Array.isArray(parsedSkills) ? parsedSkills : [parsedSkills],
      resumePath: req.file.path,
    });

    console.log("Step 2: Model instance created. Attempting DB save...");
    
    await newCandidate.save();
    
    console.log("✅ Step 3: Candidate saved to Database successfully");

    // 4. SEND EMAIL
    try {
        console.log("Step 4: Attempting to send confirmation email...");
        
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                <div style="margin-bottom: 20px;">
                    <span style="background: #0B57D0; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;">H</span>
                    <span style="font-size: 18px; font-weight: bold; color: #071952; margin-left: 5px;">Hirings</span>
                </div>
                <h2 style="color: #071952;">Application Received</h2>
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for applying for the <strong>${role}</strong> position at Hirings.</p>
                <p>We have received your resume and our recruitment team will review it shortly.</p>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                   <p style="margin: 0; font-size: 13px; color: #64748b;"><strong>Applied For:</strong> ${role}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 11px; color: #888; text-align: center;">© 2025 Hirings Talent Portal</p>
            </div>
        `;

        await sendEmail({
            email: email,
            subject: `Confirmation: Application for ${role} - Hirings`,
            html: htmlContent,
        });
        
        console.log("✅ Step 5: Email sent to candidate successfully!");

    } catch (mailError) {
        console.error("❌ EMAIL FAILED:", mailError.message);
        // Do not crash the whole request if only the email fails
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
    });

  } catch (error) {
    console.error("❌ CRITICAL SERVER ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ... keep your other functions (getAllCandidates, delete, etc.) same as before
export const getAllCandidates = async (req, res) => {
    try {
      const candidates = await Candidate.find().sort({ createdAt: -1 });
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching candidates" });
    }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 2. Delete Candidate Logic
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // FIX: Check if file exists before trying to delete it
    if (candidate.resumePath && fs.existsSync(candidate.resumePath)) {
      fs.unlinkSync(candidate.resumePath);
    }

    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.error(error); // This helps you see the actual error in the terminal
    res.status(500).json({ message: "Server Error" });
  }
}
