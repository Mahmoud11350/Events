import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="wrapper flex-between w-[80px]">
      <Logo />
      <div>
        <Link to={"/login"}>
          <Button className="text-white text-lg rounded-full min-w-32">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
