import CreateEvent from "@/pages/CreateEvent";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { action as loginAction } from "@/pages/Login";
import { action as registerAction } from "@/pages/Register";
import { loader as currentUserLoader } from "@/pages/Dashboard";

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
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);

export default router;
