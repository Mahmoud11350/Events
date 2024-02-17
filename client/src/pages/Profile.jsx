import { Button } from "@/components/ui/button";
import globalAxios from "@/lib/customFetch";
import moment from "moment";
import { Link, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const {
      data: { events },
    } = await globalAxios.get("/events/current-user");
    return events;
  } catch (error) {
    return redirect("/");
  }
};

const Profile = () => {
  const events = useLoaderData();
  return (
    <div className="">
      <div className="bg-[#F6F8FD] min-h-[100px] md:min-h-[170px] flex items-center bg-dottedPattern bg-cover bg-center">
        <div className="wrapper flex-between">
          <h2 className="wrapper h2-bold">My Tickets </h2>

          <Button to={"/#events"} className="text-white text-lg ">
            <Link to={"/"}>Explore Events</Link>
          </Button>
        </div>
      </div>
      <div className="mt-5 bg-[#FAFAFA] rounded-lg text-center min-h-[200px] flex items-center justify-center  wrapper">
        <div className="">
          <h3 className="h3-medium mb-2 font-bold">
            No event tickets purchased yet
          </h3>
          <p className="font-semibold">
            No worries - plenty of exciting events to explore!
          </p>
        </div>
      </div>
      <div className="bg-[#F6F8FD] min-h-[100px] md:min-h-[170px] flex items-center bg-dottedPattern bg-cover bg-center mt-5">
        <div className="wrapper flex-between">
          <h2 className="wrapper h2-bold">Organized Events </h2>
          <Button className="text-white text-lg ">
            <Link to={"/events/create"}>Create Event</Link>
          </Button>
        </div>
      </div>
      {events.length == 0 ? (
        <div className="mt-5 bg-[#FAFAFA] rounded-lg text-center min-h-[200px] flex items-center justify-center  wrapper">
          <div className="">
            <h3 className="h3-medium mb-2 font-bold">
              No events have been created yet
            </h3>
            <p className="font-semibold">Go create some now</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 wrapper">
          {events.map((event) => {
            return (
              <Link to={`/event/${event._id}`} key={event._id}>
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
    </div>
  );
};
export default Profile;
