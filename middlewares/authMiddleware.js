import { StatusCodes } from "http-status-codes";
import ERRORHANDLER from "../errors/errors.js";
import { verifyToken } from "../utils/tokenLibs.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new ERRORHANDLER("there are no token", StatusCodes.BAD_REQUEST);
  }
  try {
    const user = await verifyToken({ token });
    req.user = user;
    next();
  } catch (error) {
    throw new ERRORHANDLER("invalid token", StatusCodes.BAD_REQUEST);
  }
};
