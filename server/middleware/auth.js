import jwt from "jsonwebtoken";

//next: allow us to have the function continue
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    // we want the token to be starting with Bearer
    if (token.startWith("Bearer ")) {
      (token = token), slide(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    //proceed to next step of the funtion
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
