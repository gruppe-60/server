const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const serverError = createError(500, "Server Error");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await Auth.findOne({ email });
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
  console.log(email, password);
  try {
    const user = await Auth.findOne({ email });
    // const email = await Auth.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    console.log(user.password, password)
    const matched = await user.comparePassword(password, user.password);
    console.log(matched);
    if (!matched) {
      return res.status(400).json({ message: "password incorrect" });
    } 
      const payload = { userId: user._id };
      console.log(payload);

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
    
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};


// const login = async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         const error = createError(404, "email not found!");
//         next(error);
//       }
//       const matched = await user.comparePassword(password, user.password);
//       if (!matched) {
//         const error = createError(500, "password incorrect!");
//         next(error);
//       }
//       const payload = { userId: user.id };
//       const token = jwt.sign(payload, JWT_SECRETKEY, { expiresIn: "1h" });
//       res.cookie("token", token, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000, // one day
//       });
//       res.json({ msg: "you are logged in!!" });
//     } catch (error) {
//       next(serverError);
//     }
//   };



module.exports = { register, login };
