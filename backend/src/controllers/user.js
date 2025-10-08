// import User from "../models/user.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/JWT.js";

// // ✅ Register
// const handleRegister = async (req, res) => {
//   const { fullname, email, mobile, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullname,
//       email,
//       mobile,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Login
// const handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // ✅ User find
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // ✅ Password check
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // ✅ Token generate
//     const token = generateToken(user._id);
//     console.log("🔑 JWT Token:", token);  // ✅ yaha console me dikhega

//     res.status(200).json({
//       message: "Login successful",
//       token,   // frontend use karega
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         mobile: user.mobile,
//       },
//     });
//   } catch (err) {
//     console.error("Login Error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Protected Profile
// const handleProfile = async (req, res) => {
//   res.status(200).json(req.user); // ye middleware se aayega
// };


// // ✅ Get All Users
// const handleGetAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // password hide
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// // ✅ Update User
// const handleUpdateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fullname, email, mobile, password } = req.body;

//         const updateData = { fullname, email, mobile };

//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             updateData.password = await bcrypt.hash(password, salt);
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // ✅ Delete User
// const handleDeleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedUser = await User.findByIdAndDelete(id);

//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export { handleRegister, handleLogin, handleGetAllUsers, handleDeleteUser,handleProfile, handleUpdateUser };




import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/JWT.js";

// ✅ Register
const handleRegister = async (req, res) => {
  const { fullname, email, mobile, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();

    // ✅ JWT token generate
    const token = generateToken(newUser._id);

    // ✅ Cookie set
   res.cookie('token',token)

    res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, fullname, email, mobile } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ User find
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Token generate
    const token = generateToken(user._id);

    // ✅ Cookie set
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Protected Profile
const handleProfile = async (req, res) => {
  res.status(200).json(req.user); // middleware se milega
};

// ✅ Get All Users
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const handleGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Update User
const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, mobile, password } = req.body;

    const updateData = { fullname, email, mobile };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete User
const handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleDeleteUser,
  handleProfile,
  handleUpdateUser,
};
