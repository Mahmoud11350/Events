import { model, Schema, Types } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please provide event title"],
    },
    description: {
      type: String,
      required: [true, "please provide event description"],
    },
    location: {
      type: String,
      required: [true, "please provide event location"],
    },
    imageUrl: {
      type: String,
      required: [true, "please provide event image"],
    },
    startDateTime: {
      type: Date,
      default: Date.now(),
    },
    endDateTime: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: String,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "please provide event category"],
    },
    organizer: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Event", EventSchema);
