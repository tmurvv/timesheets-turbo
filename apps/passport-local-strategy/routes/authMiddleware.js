export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You must have permissions to view this resource." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({
        msg: "You must have admin permissions to view this resource.",
      });
  }
};
