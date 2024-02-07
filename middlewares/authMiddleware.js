import { StatusCodes } from "http-status-codes"
import ERRORHANDLER from "../errors/errors.js"

export const authMiddleware = (req,res,next) => {
    const token = req

    console.log(token)
    if (!token) {
        throw new ERRORHANDLER("invalid token",StatusCodes.BAD_REQUEST)
    }
    next()
}

