import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {
  sendPasswordResetSuccessEmail,
  sendResetPasswordEmail,
} from "../mailtrap/emails.js";
import crypto from "crypto";
import { generateResetPasswordToken } from "../utils/generateResetToken.js";

//reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    await sendPasswordResetSuccessEmail(user);
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error in reset password", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
    await user.save();

    await sendResetPasswordEmail(user, resetPasswordToken);
    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    console.log(`Error in forgot password ${error}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
