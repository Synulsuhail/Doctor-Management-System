import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }

    const tokenPayload = jwt.verify(atoken, process.env.JWT_SECRET);
    if (tokenPayload.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }

    next();
  } catch {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
  }
};

export default authAdmin;