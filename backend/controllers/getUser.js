const { User } = require("../model/User");

//Check if user exists by useruid
async function getUser(req, res) {
  const { useruid } = req.params;
  try {
    const user = await User.findOne({ useruid });
    if (user) {
      //Get the role
      const role = user.role;
      res.status(200).json({ exists: true, role });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getUser;
