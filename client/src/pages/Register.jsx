import Logo from "@/components/navbar/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Link, redirect } from "react-router-dom";
import axios from "@/lib/customFetch";
import { toast } from "react-toastify";
import globalAxios from "@/lib/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const user = await axios.post("/users/register", data);
    return redirect("/");
  } catch (error) {
    const errorMsg = error.response.data.errorMsg;
    toast.error(errorMsg);
    return null;
  }
};

export const loader = async () => {
  try {
    const { data } = await globalAxios.get("/users/current");
    return redirect("/");
  } catch (error) {
    return null;
  }
};

const Register = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-dottedPattern bg-cover bg-center">
      <div className="min-h-[400px] w-[400px] mx-auto border px-5 py-8 rounded-lg">
        <div className="flex items-center justify-center flex-col">
          <Logo />
          <h3 className="mt-4 font-medium">Welcome Back! </h3>
        </div>
        <Form method="post" className="w-full ">
          <Input
            placeholder="Your Name"
            name="userName"
            className="max-w-[400px] my-8"
          />
          <Input
            placeholder="name@email.com"
            name="email"
            className="max-w-[400px] my-8"
          />

          <Input
            type={"password"}
            placeholder="Password"
            name="password"
            className="mb-5"
          />
          <Button className="w-full text-white font-bold text-md">
            Sign Up
          </Button>
          <h1 className="mt-5 font-bold">
            Already Have Account!{" "}
            <Link to={"/login"} className="text-primary">
              Sign In
            </Link>
          </h1>
        </Form>
      </div>
    </div>
  );
};
export default Register;
