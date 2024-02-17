import Logo from "@/components/navbar/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import axios from "@/lib/customFetch";
import { toast } from "react-toastify";
import globalAxios from "@/lib/customFetch";

export const loader = async () => {
  try {
    const { data } = await globalAxios.get("/users/current");
    return redirect("/");
    return data.user;
  } catch (error) {
    return null;
  }
};
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const user = await axios.post("/users/login", data);
    return redirect("/");
  } catch (error) {
    const errorMsg = (
      <div className="capitalize">{error.response.data.errorMsg}</div>
    );
    toast.error(errorMsg);
    return null;
  }
};

const Login = () => {
  const errorMsg = useActionData();

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-dottedPattern bg-cover bg-center">
      <div className="min-h-[400px] w-[400px] mx-auto border p-5 rounded-lg">
        <div className="flex items-center justify-center flex-col">
          <Logo />
          <h3 className="mt-4 font-medium">Welcome Back! </h3>
        </div>
        <Form className="w-full" method="post">
          <Input
            placeholder="name@email.com"
            name="email"
            id={"email"}
            className="max-w-[400px] my-8"
          />

          <Input
            type={"password"}
            placeholder="Password"
            name="password"
            id={"password"}
            className="mb-5"
          />
          <Button className="w-full text-white font-bold text-md">
            Sign In
          </Button>
          <h1 className="mt-5 font-bold">
            Don't Have Account!{" "}
            <Link to={"/register"} className="text-primary">
              Sign Up
            </Link>
          </h1>
        </Form>
      </div>
    </div>
  );
};
export default Login;
