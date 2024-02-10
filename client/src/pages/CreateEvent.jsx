import CreateEventForm from "@/components/createEventForm/CreateEventForm";

const CreateEvent = () => {
  return (
    <div>
      <div className="bg-[#F6F8FD] min-h-[100px] md:min-h-[170px] flex items-center bg-dottedPattern bg-cover bg-center">
        <h2 className="wrapper h2-bold">Create Event</h2>
      </div>
      <CreateEventForm />
    </div>
  );
};
export default CreateEvent;
