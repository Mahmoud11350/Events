import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

export const getAllCatigories = async (req, res) => {
  const catigories = await Category.find();

  res.status(StatusCodes.OK).json({ catigories });
};
