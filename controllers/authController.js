const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await await Auth.findOne({ email });
    if (userExists) {
      return res.status(409).json({ msg: "user already exists!" });
    }

    const newUser = new Auth({
      email,
      password,
    });

    await newUser.save();
    const publicUser = newUser.publicFields();

    res.json({ message: "user created!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await Auth.findOne({ email });
    // const email = await Auth.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const matched = await user.comparePassword(password, user.password);
    if (!matched) {
      return res.status(400).json({ message: "password incorrect" });
    } else {
      const payload = { userId: user._id };

      const secretkey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretkey, { expiresIn: "11h" });
      console.log(token);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true,
        // sameSite: "Lax",
      });
      res.status(200).json({ message: "user logged in!" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { register, login };
