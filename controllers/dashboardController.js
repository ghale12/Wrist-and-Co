exports.userDashboard = (req, res) => {
  res.json({ msg: `Welcome to the user dashboard, user ${req.user.id}` });
};

exports.adminDashboard = (req, res) => {
  res.json({ msg: `Welcome to the admin dashboard, user ${req.user.id}` });
}; 