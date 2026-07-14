


// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const adminSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//       maxlength: [50, "Name cannot exceed 50 characters"],
//     },

//     personalEmail: {
//       type: String,
//       required: [true, "Personal email is required"],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid personal email address",
//       ],
//     },

//     companyEmail: {
//       type: String,
//       required: [true, "Company email is required"],
//       // default: "info@hirings.in",
//       trim: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid company email address",
//       ],
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [8, "Password must be at least 8 characters"],
//       select: false,
//     },

//     phone: {
//       type: String,
//       unique: true,
//       sparse: true,
//       trim: true,
//       match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"],
//     },

//     avatar: {
//       type: String,
//       default: "",
//     },

//     // Verification Status for Dual Email
//     isPersonalVerified: {
//       type: Boolean,
//       default: false,
//     },

//     isCompanyVerified: {
//       type: Boolean,
//       default: false,
//     },

//     // Separate OTP storage to handle simultaneous verification
//     otpPersonal: {
//       type: String,
//       select: false,
//     },
//     otpPersonalExpire: {
//       type: Date,
//       select: false,
//     },

//     otpCompany: {
//       type: String,
//       select: false,
//     },
//     otpCompanyExpire: {
//       type: Date,
//       select: false,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },

//     lastLoginAt: {
//       type: Date,
//     },

//     passwordChangedAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//         delete ret.password;
//         delete ret.otpPersonal;
//         delete ret.otpPersonalExpire;
//         delete ret.otpCompany;
//         delete ret.otpCompanyExpire;
//         return ret;
//       },
//     },
//   }
// );

// /**
//  * Encrypt password before saving
//  */
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// /**
//  * Method to compare password for login logic
//  */
// adminSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Admin = mongoose.model("Admin", adminSchema);

// export default Admin;



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    // REMOVED 'required' from these because they aren't available 
    // at the moment the OTP is sent (the first step of registration)
    name: {
      type: String,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    personalEmail: {
      type: String,
      required: [true, "Personal email is required"],
      unique: true, // This is your primary unique key
      trim: true,
      lowercase: true,
    },

    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      // REMOVED 'required' here; you will validate this in the 
      // final 'register' function instead
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, // 'sparse' allows multiple nulls if the field is unique
      trim: true,
    },

    // ... rest of your fields (isPersonalVerified, otpPersonal, etc.)
    isPersonalVerified: { type: Boolean, default: false },
    isCompanyVerified: { type: Boolean, default: false },
    otpPersonal: { type: String, select: false },
    otpPersonalExpire: { type: Date, select: false },
    otpCompany: { type: String, select: false },
    otpCompanyExpire: { type: Date, select: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ... keep your pre-save and comparePassword methods the same
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;