import ERRORHANDLER from "../errors/errors.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { createToken } from "../utils/tokenLibs.js";

export const registerUser = async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    throw new ERRORHANDLER("email already in use ", StatusCodes.BAD_REQUEST);
  }
  const user = await User.create(req.body);
  const { userName, email, _id } = user;
  const token = await createToken({ userName, email, _id });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    signed: true,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ERRORHANDLER(
      "please provide email and password ",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ERRORHANDLER("email doesn't exist", StatusCodes.BAD_REQUEST);
  }
  const isPasswordCorrect = await user.comparePasswords(
    user.password,
    password
  );

  if (!isPasswordCorrect) {
    throw new ERRORHANDLER("wrong password", StatusCodes.BAD_REQUEST);
  }

  const token = await createToken({
    userName: user.userName,
    email,
    _id: user._id,
  });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    signed: true,
  });
  res.status(StatusCodes.OK).json({ user });
};
export const logoutUser = async (req, res) => {
  res.cookie("token", "logedout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "loged out successfully" });
};
