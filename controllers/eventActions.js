import { StatusCodes } from "http-status-codes"

export const createEvent = (req,res) => {
    res.status(StatusCodes.CREATED).json({msg:"created"})
}

export const getEvent = (req,res) => {
    res.status(StatusCodes.OK).json({msg:"event"})
}

export const getAllEvents = (req,res) => {
    res.status(StatusCodes.OK).json({msg:"all events"})
}

export const updateEvent = (req,res) => {
    res.status(StatusCodes.OK).json({msg:"update event"})
}


export const deleteEvent = (req,res) => {
    res.status(StatusCodes.OK).json({msg:"delete event"})
}