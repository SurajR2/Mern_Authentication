import jwt from "jsonwebtoken";

export const generateResetPasswordToken = async (res, userId) => {
  let token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("resetToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  return token;
};
