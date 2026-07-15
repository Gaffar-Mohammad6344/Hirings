// import mongoose from 'mongoose';

// const ContactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Contact', ContactSchema);


import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  fullName: String, // Changed from 'name' to match your frontend
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// This check is crucial for Next.js
export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);