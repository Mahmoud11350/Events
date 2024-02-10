import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import globalAxios from "@/lib/customFetch";
import { createContext, useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await globalAxios.get("/users/current");
    return data.user;
  } catch (error) {
    return null;
  }
};
const DashboardContext = createContext();
const Dashboard = () => {
  const currentUser = useLoaderData();
  return (
    <DashboardContext.Provider value={{ currentUser }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </DashboardContext.Provider>
  );
};
export default Dashboard;
export const useDashboardContext = () => useContext(DashboardContext);
