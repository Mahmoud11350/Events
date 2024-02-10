import jwt from "jsonwebtoken";

export const createToken = ({ userName, email, _id }) =>
  jwt.sign({ userName, email, _id }, process.env.TOKEN_SECRET);

export const verifyToken = ({ token }) =>
  jwt.verify(token, process.env.TOKEN_SECRET);
