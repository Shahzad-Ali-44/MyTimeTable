import User from '../model/userModel.js';

export const notification = async (req, res) => {
    const { token } = req.body;
    const userId = req.userId; 
    
    if (!token) {
      return res.status(400).json({ msg: "Token is required" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      
      if (!user.firebaseTokens.includes(token)) {
        user.firebaseTokens.push(token);
        await user.save();
      }
  
      res.status(200).json({ msg: "Token saved successfully" });
    } catch (error) {
      console.error("Error saving token:", error);
      res.status(500).json({ error: "Error saving token" });
    }
  };
  

