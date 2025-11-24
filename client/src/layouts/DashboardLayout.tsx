import MobilePreview from "@/components/global/MobilePreview";
import { Sidebar, sidebarOptionType } from "@/components/global/Sidebar";
import { ChartBar, LayoutPanelLeft, Link, Palette } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

const SidebarOptions: sidebarOptionType[] = [
  {
    title: "Links",
    navigateTo: "/dashboard",
    icon: <Link className="h-4 w-4" />,
  },
  {
    title: "Layout",
    navigateTo: "/dashboard/layout",
    icon: <LayoutPanelLeft className="h-4 w-4" />,
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
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar optionsArray={SidebarOptions} />
      <div className="flex-1 flex items-start">
        <div className="flex-1 h-screen overflow-y-auto p-4">
          <Outlet />
        </div>
        {["/dashboard", "/dashboard/appearance"].includes(
          location.pathname
        ) && (
          <div className="w-1/3 p-10 box-border">
            <MobilePreview />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
