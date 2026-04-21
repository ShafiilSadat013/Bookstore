module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
      console.log(req.session.user);
    }
    res.status(401).json({ message: "Unauthorized" });
  },
  isAdmin: (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
      return next();
    }
    res.status(403).json({ message: "Forbidden: Admins only" });
  },
};
