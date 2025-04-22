import jwt from "jsonwebtoken";


const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.jwt;

      if (!token) {
        return res.redirect("/?authError=true");
      }
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
