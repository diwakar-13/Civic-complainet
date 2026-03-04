import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // check exists or not

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Invalid token" });
  }
};
