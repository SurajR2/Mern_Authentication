import { User } from "../models/user.model.js";
import { sendWelcomeEmail } from "../mailtrap/emails.js";

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user);

    return res.status(200).json({
      success: true,
      message: "Email is verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verify email", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in checkAuth", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
