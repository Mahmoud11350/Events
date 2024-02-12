import globalAxios from "@/lib/customFetch";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const {
    data: { events },
  } = await globalAxios.get("/events");
  if (events) return events;
  return [];
};

const Events = () => {
  const events = useLoaderData();
  console.log(events);
  return (
    <section className="wrapper">
      <h1 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h1>
      <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 ">
        <Input
          name="title"
          placeholder="event title"
          className="bg-[#f6f6f6]  rounded-full text-lg  block capitalize outline-none font-bold text-black"
        />
        <Select className="">
          <SelectTrigger className="w-full bg-[#FAFAFA] rounded-full font-bold ">
            <SelectValue placeholder="Select a Category" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
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
                <div>
                  <img src={event.imageUrl} alt={event.title} />
                  <h3>{event.title}</h3>
                  <p>{event.startDateTime}</p>
                  <span>{event.isFree ? "Free" : event.price}</span>
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
