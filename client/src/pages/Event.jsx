import globalAxios from "@/lib/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import locationSvg from "@/public/assets/icons/location.svg";
import moment from "moment";

export const loader = async ({ request, params }) => {
  try {
    const {
      data: { event },
    } = await globalAxios.get(`/events/${params.id}`);
    return event;
  } catch (error) {
    toast.error(error.response.data.errorMsg);
    return redirect("/");
  }
};
const Event = () => {
  const event = useLoaderData();
  return (
    <div className="wrapper ">
      <div className="">
        <img src={event.imageUrl} className="rounded-lg w-full max-h-[400px]" />
      </div>
      <div>
        <h2 className="text-lg mt-4 font-bold">{event.title}</h2>
        <p className="flex items-center gap-2 text-sm font-medium mt-2">
          <span className="p-1 rounded bg-green-300  block">
            {event.isFree ? "Free" : `${event.price}$`}
          </span>

          <span className="bg-slate-100 p-2 rounded capitalize text-slate-800">
            {event.category}
          </span>
        </p>
        <p className="text-md font-medium mt-2">
          by :{" "}
          <span className="text-slate-600">{event.organizer.userName}</span>
        </p>
        <p className="flex items-center   text-sm font-medium text-slate-500 mt-1">
          {moment(event.startDateTime).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p className="flex items-center mt-4">
          <img src={locationSvg} alt="" className="filter grayscale w-8" />
          <span className="text-md font-semibold">{event.location}</span>
        </p>
        <p className="flex flex-col mt-5">
          <span className="text-lg font-semibold mb-2">
            What You Will Learn
          </span>
          <span className="text-sm font-medium"> {event.description}</span>
        </p>
      </div>
    </div>
  );
};

export default Event;
