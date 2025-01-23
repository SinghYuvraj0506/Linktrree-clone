import { Sidebar, sidebarOptionType } from "@/components/global/Sidebar";
import { ChartBar, Link, Palette } from "lucide-react";
import { Outlet } from "react-router-dom";

const SidebarOptions: sidebarOptionType[] = [
  {
    title: "Links",
    navigateTo: "/dashboard",
    icon: <Link className="h-4 w-4" />,
  },
  {
    title: "Appearance",
    navigateTo: "/dashboard/appearance",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    navigateTo: "/dashboard/analytics",
    icon: <ChartBar className="h-4 w-4" />,
  },
];


const DashboardLayout = () => {
  return (
    <div className="flex items-start">
      <Sidebar optionsArray={SidebarOptions} />
      <div className="flex-1 overflow-x-hidden min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};


export default DashboardLayout;
