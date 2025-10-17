import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user is not found" });
    }
    res.status(200).json({
        success: true,
        userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified,
        }
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
