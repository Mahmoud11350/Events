import { Button } from "@/components/ui/button";
import menuSvg from "@/public/assets/icons/menu.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

const links = [
  { path: "/", name: "Home" },
  { path: "/events/create", name: "Create Event" },
  { path: "/profile", name: "Profile" },
];

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <img src={menuSvg} alt="Munu Svg" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ul className=" flex flex-col gap-4 font-bold">
            {links.map((link) => (
              <li className="text-md ">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
