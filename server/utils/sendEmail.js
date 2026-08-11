// import nodemailer from "nodemailer";

// const sendEmail = async ({ email, otp, subject }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject,
//     html: `
//       <h2>Your OTP Code</h2>
//       <h1>${otp}</h1>
//       <p>This OTP will expire in 10 minutes.</p>
//     `,
//   });
// };


// export default sendEmail;


// import nodemailer from "nodemailer";

// const sendEmail = async ({ email, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Hirings Portal" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: subject,
//       html: html, // This allows you to send the custom HTML from your controller
//     };

//     const info = await transporter.sendMail(mailOptions);
//     return info;
//   } catch (error) {
//     console.error("Email Error:", error);
//     throw new Error("Email could not be sent");
//   }
// };

// export default sendEmail;


// import nodemailer from "nodemailer";

// const sendEmail = async ({ email, subject, html, replyTo }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // Your Gmail
//         pass: process.env.EMAIL_PASS, // Your App Password
//       },
//     });

//     const mailOptions = {
//       from: `"Hirings Portal" <${process.env.EMAIL_USER}>`, // MUST be your email
//       to: email,      // The person receiving the data (you)
//       replyTo: replyTo, // Allows you to click 'Reply' in your inbox
//       subject: subject,
//       html: html,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Nodemailer Error:", error);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;


// import nodemailer from "nodemailer";

// const sendEmail = async ({ email, subject, html, replyTo }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Hirings Portal" <${process.env.EMAIL_USER}>`, 
//       to: email,      // This sends the data to your email
//       replyTo: replyTo, // This is the user's email so you can reply to them
//       subject: subject,
//       html: html,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Nodemailer Error:", error);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html, replyTo }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Hirings <onboarding@resend.dev>",
      to: [email],
      replyTo: replyTo,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message || "Email sending failed");
    }

    console.log("Email sent successfully:", data?.id);

    return data;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;