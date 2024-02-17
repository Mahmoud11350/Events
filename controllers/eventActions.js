import { StatusCodes } from "http-status-codes";
import Event from "../models/Event.js";
import ERRORHANDLER from "../errors/errors.js";
import { uploadImage } from "../utils/uploadImage.js";
import User from "../models/User.js";
export const createEvent = async (req, res) => {
  req.body.organizer = req.user._id;
  // req.body.imageUrl = uploadImage(req);
  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};

export const getEvent = async (req, res) => {
  const eventId = req.params.id;
  const event = await Event.findById(eventId).populate({
    path: "organizer",
  });
  if (!event) {
    throw new ERRORHANDLER(`no event with id ${eventId}`);
  }
  res.status(StatusCodes.OK).json({ event });
};

export const getAllEvents = async (req, res) => {
  const { search } = req.query;
  const querObject = {};
  if (search) {
    querObject.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }
  const events = await Event.find(querObject).populate({
    path: "organizer",
  });
  res.status(StatusCodes.OK).json({ events });
};

export const getcurrentUserEvents = async (req, res) => {
  if (!req.user) {
    throw new ERRORHANDLER("please login first", StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    throw new ERRORHANDLER("please signup first", StatusCodes.BAD_REQUEST);
  }

  const events = await Event.find({
    organizer: user._id,
  }).populate({
    path: "organizer",
  });
  res.status(StatusCodes.OK).json({ events });
};

export const updateEvent = async (req, res) => {
  const eventExist = await Event.findOne({ _id: req.body.eventId });
  if (!eventExist) {
    throw new ERRORHANDLER(`no event with id ${eventId}`);
  }
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: req.body.eventId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedEvent });
};

export const deleteEvent = async (req, res) => {
  const eventExist = await Event.findOne({ _id: req.body.eventId });
  if (!eventExist) {
    throw new ERRORHANDLER(`no event with id ${eventId}`);
  }
  const deletedEvent = await Event.findOneAndDelete({ _id: req.body.eventId });
  res.status(StatusCodes.OK).json({ deletedEvent });
};
