import { Input } from "@/components/ui/input";
import React from "react";

const ColorPicker = ({ selected, onChange }) => {
  return (
    <div>
      <h6 className="font-bold">Color</h6>
      <div className="flex items-center gap-4">
        <Input
          type="color"
          id={`${Math.random()}`}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 border-none p-0 cursor-pointer"
        />
        <span className="text-sm">{selected}</span>
      </div>
      </div>
  );
};

export default ColorPicker;
