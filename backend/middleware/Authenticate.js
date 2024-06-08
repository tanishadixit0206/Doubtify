import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv';

// dotenv.config();
const JWT_SECRET = "FHHHHHVhsvhdhaee4456sjyjmjyohs6j86j2jshiJSHjsnjmd"



const authenticate = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jsonwebtoken.verify(token,JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.clearCookie("token")
    res.redirect("/");
  }
};

export default authenticate;