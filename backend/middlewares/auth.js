import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


const auth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Nao autorizado!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id;

  } catch (err) {
    return res.status(401).json({ message: "Token invalido!" });
  }

  next();
};

export default auth;
