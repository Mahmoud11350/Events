import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDashboardContext } from "@/pages/Dashboard";
import MobileNavbar from "./MobileNavbar";
import arrowSvg from "@/public/assets/icons/arrow-down.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import globalAxios from "@/lib/customFetch";

const links = [
  { path: "/", name: "Home" },
  { path: "/events/create", name: "Create Event" },
  { path: "/profile", name: "Profile" },
];

const Navbar = () => {
  const { currentUser } = useDashboardContext();
  const navigate = useNavigate();
  const signOutHandler = async () => {
    const signedUser = await globalAxios.post("/users/logout");
    navigate("/");
  };
  return (
    <div className="wrapper flex-between w-[80px]">
      <Logo />
      {currentUser && (
        <div className="hidden md:block">
          <ul className="flex-center gap-8 font-medium">
            {links.map((link) => (
              <li className="text-md " key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive && "text-primary"}
                  end
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex-center gap-5">
        {currentUser !== null && (
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        )}
        {currentUser !== null && (
          <DropdownMenu>
            <DropdownMenuTrigger className="capitalize text-md font-medium flex-center p-2 gap-2 rounded-lg border">
              {currentUser.userName}
              <img src={arrowSvg} className="" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={signOutHandler}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {currentUser == null && (
        <div>
          <Link to={"/login"}>
            <Button className="text-white text-lg rounded-full min-w-32">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
