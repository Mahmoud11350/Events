import { StatusCodes } from "http-status-codes"

export const createCategory = (req,res) => {
    res.status(StatusCodes.CREATED).json("category created")
}

export const getAllCatigories = (req,res) => {
    res.status(StatusCodes.OK).json("category created")
}