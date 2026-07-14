// import mongoose from 'mongoose';

// const candidateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   skills: { type: [String], required: true },
//   resumePath: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Candidate', candidateSchema);


// import mongoose from 'mongoose';

// const candidateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   role: { type: String, default: "Frontend Developer" }, // Default or passed from form
//   skills: { type: [String] },
//   resumePath: { type: String },
//   status: { type: String, default: 'Pending' }, // Applied, Interview, Hired
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Candidate', candidateSchema);



import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Frontend Developer",
    },

    message: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: [String],
      },
    ],

    resumePath: {
      type: String,
      required: true,
    },
status: {
  type: String,
  enum: ["PENDING", "SHORTLISTED", "INTERVIEW", "REJECTED", "HIRED"],
  default: "PENDING"
}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Candidate", candidateSchema);