import jwt from "jsonwebtoken";

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      const token = req.cookies?.jwt;

      if (!token) {
        return res.redirect("/");
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


const requireAuth =(req, res, next) => {
  const token = req.cookies?.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/");
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

export default { auth, requireAuth };
