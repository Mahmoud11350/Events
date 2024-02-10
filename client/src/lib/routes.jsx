import CreateEvent from "@/pages/CreateEvent";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { action as loginAction } from "@/pages/Login";
import { action as registerAction } from "@/pages/Register";
import { loader as currentUserLoader } from "@/pages/Dashboard";
import { loader as loginLoader } from "@/pages/Login";
import { loader as registerLoader } from "@/pages/Register";
import { action as createEventAction } from "@/components/createEventForm/CreateEventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: currentUserLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events/create",
        element: <CreateEvent />,
        action: createEventAction,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
    loader: registerLoader,
  },
]);

export default router;
