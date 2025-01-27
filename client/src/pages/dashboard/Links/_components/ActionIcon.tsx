import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

import { ReactNode } from "react";
import { X } from "lucide-react";

type IconProps = {
  icon: ReactNode;
  tooltip: string;
  Content: ReactNode;
};

const ActionIcons = ({ icon, tooltip, Content }: IconProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon">
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="w-100 p-6 rounded-xl box-border">
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">{tooltip}</h4>
            <PopoverClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </PopoverClose>
          </div>
          <div className="flex-1 min-w-[20vw]">{Content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ActionIcons;
