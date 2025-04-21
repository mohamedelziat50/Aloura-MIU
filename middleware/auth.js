import jwt from "jsonwebtoken";

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // { id, role }

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Invalid or expired token", error: error.message });
    }
  };
};

export default auth;
