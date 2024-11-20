import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  try {
    //checking if all the required fields are present
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // checking if the email is already in the database
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hashing the password and creating a new user document in the database
    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // saving new user document in the database
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, //15 minutes
    });
    await user.save();
    // jwt token generation
    generateTokenAndSetCookie(res, user._id);
    //sending the verification email with token
    await sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "User saved successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All Fields are required");
    }
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "User not found or not verified" });
    }
    const isPasswordVaild = await bcryptjs.compare(password, user.password);
    if (!isPasswordVaild) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
