import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Please login again." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.user = { id: decodedToken.id };
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Please login again.",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export default userAuth;
