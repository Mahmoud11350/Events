import globalAxios from "@/lib/customFetch";
import { Input } from "../ui/input";

import { Link, useLoaderData } from "react-router-dom";
import moment from "moment/moment";
import { useState } from "react";

export const loader = async () => {
  const {
    data: { events },
  } = await globalAxios.get("/events");
  if (events)
    return {
      events,
    };
  return [];
};

const Events = () => {
  const { events } = useLoaderData();
  return (
    <section className="wrapper">
      <h1 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h1>

      {events.length == 0 ? (
        <div className="mt-5 bg-[#FAFAFA] rounded-lg text-center min-h-[200px] flex items-center justify-center bg-dottedPattern bg-cover bg-center">
          <div className="">
            <h3 className="h3-medium mb-2 font-bold">No Events Found</h3>
            <p className="font-semibold">Come back later</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
          {events.map((event) => {
            return (
              <Link to={`event/${event._id}`}>
                <div className="">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="rounded-lg"
                  />
                  <h3 className="mt-4 mb-2 text-md font-semibold">
                    {event.title}
                  </h3>
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    {moment(event.startDateTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium mt-2">
                    <span className="p-1 rounded bg-green-300  block">
                      {event.isFree ? "Free" : `${event.price}$`}
                    </span>

                    <span className="bg-slate-100 p-2 rounded capitalize text-slate-800">
                      {event.category}
                    </span>
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-2">
                    by: {event.organizer.userName}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default Events;
