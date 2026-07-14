import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

export const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    // 1. Validation
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    
    
    // 2. Save to Database
    await Contact.create({ name: fullName, email, message });

    // --- TEMPLATE 1: FOR THE USER (Confirmation) ---
    const userHtml = `
      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 0;">
        <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="margin-bottom: 30px;">
             <span style="background: #071952; color: white; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 18px;">H</span>
             <span style="font-size: 22px; font-weight: 800; color: #071952; margin-left: 8px;">Hirings</span>
          </div>
          <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 8px;">Thanks for contacting us!</h2>
          <p style="color: #64748b; font-size: 15px; line-height: 24px; margin-bottom: 30px;">Hello ${fullName}, we have received your inquiry. Our team will get back to you within 24 hours.</p>
          <div style="border: 2px dashed #f97316; border-radius: 16px; padding: 25px; background-color: #fffaf5;">
            <p style="text-align: center; color: #f97316; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px;">Your Inquiry Details</p>
            <p style="color: #071952; font-size: 14px; margin: 5px 0;"><strong>Message:</strong> "${message}"</p>
          </div>
          <div style="margin-top: 40px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            <p style="color: #cbd5e1; font-size: 11px;">© 2025 Hirings Portal</p>
          </div>
        </div>
      </div>
    `;

    // --- TEMPLATE 2: FOR THE ADMIN (Notification) ---
    const adminHtml = `
      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 50px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
          <div style="background-color: #071952; padding: 30px; text-align: center;">
            <span style="color: #60a5fa; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px;">Hirings Admin Portal</span>
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">New Lead Alert</h1>
          </div>
          <div style="padding: 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">Lead Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #071952; font-size: 15px; font-weight: 700;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #0B57D0; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #334155; font-size: 14px; font-style: italic;">"${message}"</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #071952; color: #ffffff; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">Reply to ${fullName.split(' ')[0]}</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 10px;">Automated CRM Notification</div>
        </div>
      </div>
    `;

    // 3. SEND EMAIL TO THE USER
    await sendEmail({
      email: email,
      subject: "We've received your inquiry - Hirings",
      html: userHtml,
    });

    // 4. SEND EMAIL TO THE ADMIN (You)
    await sendEmail({
      email: "info@hirings.in", // YOUR Destination
      replyTo: email,                        // Allows you to click 'Reply' in inbox
      subject: `🔥 New Lead: ${fullName}`,
      html: adminHtml,
    });

    // 5. SUCCESS RESPONSE
    return res.status(200).json({ 
      success: true, 
      message: "Form submitted and emails sent successfully!" 
    });

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error. Please try again later." 
    });
  }
};