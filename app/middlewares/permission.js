module.exports  = (...permittedRoles) => {
  return (req, res, next) => {
    const { auth } = req

    if (auth && permittedRoles.includes(auth.role)) {
      next();
    } else {
      res.status(403).json({ error: true, message: "You do not have permission. Please login as other user"});
    }
  }
}