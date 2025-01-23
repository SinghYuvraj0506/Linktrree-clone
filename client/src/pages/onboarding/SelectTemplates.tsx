import { Button } from "@/components/ui/button";
import { templates } from "@/lib/constants";
import React, { useState } from "react";

type Props = {
  handleNext: () => void;
};

type CardProps = {
  isSelected: boolean;
  imageUrl: string;
  name: string;
  description: string;
  id: string;
  onSelect: (id: string) => void;
};

const TemplateCard = ({
  isSelected,
  imageUrl,
  name,
  description,
  id,
  onSelect,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`h-[50vh] relative aspect-[9/16] cursor-pointer rounded-2xl overflow-hidden transition-all duration-200 ${
        isSelected ? "ring-2 ring-black" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(id)}
    >
      <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      {(isHovered || isSelected) && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SelectTemplates = ({ handleNext }: Props) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const onSelect = (id:string)=> {
     setSelectedTemplate(id)
  }

  const handleSubmit = () => {
    handleNext()
  }

  return (
    <div className="flex flex-col gap-10 w-full mx-auto my-[4vh]">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Select Your Templates
      </h1>

      <div className="flex items-center justify-center gap-10 px-40 box-border overflow-x-auto">
        {templates?.map((e) => (
          <TemplateCard isSelected={e.id === selectedTemplate} {...e} onSelect={onSelect}/>
        ))}
      </div>

      <Button
          variant="default"
          className="w-2/3 mx-auto mt-8"
          disabled={!selectedTemplate}
          onClick={handleSubmit}
        >
          Continue 
        </Button>
    </div>
  );
};

export default SelectTemplates;
