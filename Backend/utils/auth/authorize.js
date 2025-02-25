const authorizeAdmin = (req, res, next) => {
  const role = req.header("Role");

  if (role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = authorizeAdmin;
