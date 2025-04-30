import User from '../model/userModel.js';

export const notification = async (req, res) => {
  const { token, deviceId } = req.body;
  const userId = req.userId;

  if (!token || !deviceId) {
    return res.status(400).json({ msg: "Token and deviceId are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.firebaseTokens = user.firebaseTokens.filter(t => t.deviceId !== deviceId);
    user.firebaseTokens.push({ token, deviceId });
    await user.save();
    return res.status(200).json({ msg: "Token saved & previous cleaned" });
  } catch (err) {
    console.error("Error saving token:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

