import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/?login=true");
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/?login=true");
  }
};

export default requireAuth;
