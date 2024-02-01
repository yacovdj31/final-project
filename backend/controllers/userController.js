const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const photo = req.file;

  try {
    if (!photo) {
      throw new Error("Photo is required");
    }

    const photoPath = path.join("/uploads", photo.filename);

    const user = await User.signup(email, password, photoPath);
    const token = createToken(user._id);

    res.status(200).json({ email, token, photo: photoPath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
