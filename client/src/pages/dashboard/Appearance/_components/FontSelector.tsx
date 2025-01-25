import React from "react";
import { Card } from "@/components/UI/Card";

const fonts = ["Roboto", "Inter", "Arial", "Montserrat"];

const FontSelector = ({ selected, onChange }) => {
  return (
    <Card>
      <h2 className="text-lg font-bold">Font Type</h2>
      <div className="flex flex-col space-y-2 mt-4">
        {fonts.map((font) => (
          <button
            key={font}
            className={`px-4 py-2 rounded-md border ${
              selected === font ? "bg-primary text-white" : "bg-muted"
            }`}
            onClick={() => onChange(font)}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default FontSelector;
