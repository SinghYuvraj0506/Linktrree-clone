import React, { ChangeEvent, ReactEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copy, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export type sidebarOptionType = {
  title: string;
  navigateTo: string;
  icon?: React.ReactNode;
};

interface SidebarProps {
  optionsArray: sidebarOptionType[];
}

export const Sidebar: React.FC<SidebarProps> = ({ optionsArray }) => {
  const {user} = useAppSelector(state => state.auth)
  const { toast } = useToast();
  
  const copyToClipboard = async (e:any) => {
    e?.stopPropagation();
    try {
      const profileLink = `https://${window.location.hostname}/${user?.slug}`;
      await navigator.clipboard.writeText(profileLink);
      toast({
        title: "Info",
        description: "Link Copied Successfully",
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy profile link:", err);
    }
  };
  return (
    <div className="hidden border-r bg-muted/40 md:block h-screen overflow-hidden sticky left-0 top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[55px] lg:px-6 box-border">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary-green font-bold">Linktree Clone</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {optionsArray?.map((option, i) => (
              <Link
                to={option?.navigateTo}
                key={`desktopSidebarOption` + i}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {option?.icon}
                {option?.title}
              </Link>
            ))}
          </nav>
        </div>

        <DropdownMenu>
          <div className="flex items-center justify-center gap-2 px-2 box-border mb-4 focus:outline-none">
            <DropdownMenuTrigger>
              <Avatar
                className="cursor-pointer"
              >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user?.name.toUpperCase().slice(0,2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {user?.slug && <div
              className="flex-1 rounded-xl text-sm bg-gray-200 flex items-center justify-between px-2 py-2 cursor-pointer"
              onClick={copyToClipboard}
            >
              @{user?.slug.slice(0,4)+"..."}
              <Copy className="w-4" />
            </div>}
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Switch Account</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
