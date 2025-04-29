import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const userData = new User({
      email,
      password: hashedPassword,
    });

    await userData.save();

    res.status(200).json({ msg: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password, timezone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    if (timezone && user.timezone !== timezone) {
      user.timezone = timezone;
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



