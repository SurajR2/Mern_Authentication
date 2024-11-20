import jwt, { decode } from "jsonwebtoken";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized - no token available" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized - invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in verifyUserToken", error);
    return res
      .status(500)
      .json({ success: false, message: `server error:${error}` });
  }
};