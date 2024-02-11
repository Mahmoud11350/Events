import { Form, redirect, useNavigation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import imageUploader from "@/public/assets/icons/file-upload.svg";
import locationSvg from "@/public/assets/icons/location-grey.svg";
import calender from "@/public/assets/icons/calendar.svg";
import priceSvg from "@/public/assets/icons/dollar.svg";
import linkSvg from "@/public/assets/icons/link.svg";
import DatePicker from "react-datepicker";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import "react-datepicker/dist/react-datepicker.css";
import globalAxios from "@/lib/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  let event = Object.fromEntries(formData);
  event.isFree == "on" ? (event.isFree = true) : (event.isFree = false);
  try {
    const { data } = await globalAxios.post("/events/image-upload", formData);
    event.imageUrl = data;
    const CreatedEvent = await globalAxios.post("/events", event);
    return redirect("/");
  } catch (error) {
    const errorMsg = error.response.data.errorMsg;

    toast.error(errorMsg);
    return null;
  }
};

const CreateEventForm = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());

  const [pickedImage, setPickedImage] = useState();
  const handleImageForm = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const inputRef = useRef();
  const handleFileUpload = () => {
    inputRef.current.click();
  };
  return (
    <Form className="wrapper" method="post" encType="multipart/form-data">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          placeholder="event title"
          name="title"
          className="w-full bg-[#FAFAFA] rounded-full font-bold capitalize py-5 input-field "
        />
        <Select
          className="input-field focus-visible:ring-transparent focus-visible:ring-offset-0"
          name={"category"}
        >
          <SelectTrigger className="w-full bg-[#FAFAFA] rounded-full font-bold input-field focus-visible:ring-transparent focus-visible:ring-offset-0 ">
            <SelectValue placeholder="Select a Category" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="apple" className="font-bold">
                Apple
              </SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <Textarea
          placeholder="event description"
          className="flex-1 min-h-[200px] bg-[#FAFAFA] capitalize text-md rounded-xl"
          name="description"
        />
        <div className="flex-1 h-[200px] bg-[#FAFAFA] rounded-xl flex items-center justify-center">
          <Input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            ref={inputRef}
            name="imageUrl"
            onChange={(e) => handleImageForm(e)}
          />

          {pickedImage == null ? (
            <div
              className="flex-center flex-col gap-2 h-full cursor-pointer"
              onClick={handleFileUpload}
            >
              <img src={imageUploader} alt="File Upload" />
              <p>SVG,PNG,JPG</p>
              <Button className="text-white rounded-full">
                Select From Computer
              </Button>
            </div>
          ) : (
            <img
              src={pickedImage}
              className="w-full rounded-lg h-full"
              onClick={handleFileUpload}
            />
          )}
        </div>
      </div>
      <div className="flex items-center mt-6 bg-[#FAFAFA] p-2 rounded-full">
        <img src={locationSvg} className=" h-[54px] w-8" />
        <Input
          name="location"
          className={"   border-none bg-[#FAFAFA] input-field"}
          placeholder="Event Location Or Online"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2    mt-6 gap-5">
        <div className="flex items-center gap-2 bg-[#FAFAFA] p-2 rounded-full">
          <p className="flex items-center gap-2">
            <img
              src={calender}
              alt=""
              className="filter grayscale h-[54px] w-8"
            />
            Start Date :{" "}
          </p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="bg-[#FAFAFA]"
            name="startDate"
          />
        </div>
        <div className="flex items-center gap-2 bg-[#FAFAFA] p-2 rounded-full">
          <p className="flex items-center gap-2">
            <img
              src={calender}
              alt=""
              className="filter grayscale h-[54px] w-8"
            />
            End Date :{" "}
          </p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="bg-[#FAFAFA]"
            name="endDate"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2   gap-5">
        <div className="flex items-center mt-6 bg-[#FAFAFA] p-2 rounded-full">
          <img src={priceSvg} className=" h-[54px] w-8" />
          <Input
            name="price"
            type="number"
            min="0"
            className={"   border-none bg-[#FAFAFA] input-field"}
            placeholder="Price"
          />
          <div className="flex items-center space-x-2">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 min-w-[80px]"
            >
              Free Ticket
            </label>
            <Checkbox id="terms" name="isFree" />
          </div>
        </div>
        <div className="flex items-center mt-6 bg-[#FAFAFA] p-2 rounded-full">
          <img src={linkSvg} className=" h-[54px] w-8" />
          <Input
            name="url"
            type="text"
            className={" bg-[#FAFAFA] input-field"}
            placeholder="URL"
          />
        </div>
      </div>
      <Button
        disabled={navigation.state == "submitting"}
        className={`mt-6 text-md font-bold text-white w-full h-[50px]`}
      >
        {navigation.state == "submitting" ? "Creating Event" : " Creat Event"}
      </Button>
    </Form>
  );
};
export default CreateEventForm;
