import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const EditableAvatar = ({
  name,
  imgSrc,
}: {
  name: string;
  imgSrc?: string;
}) => {
  return (
    <div className="relative">
      {/* Avatar */}
      <Avatar className="w-16 h-16 relative top-3 bg-black text-white">
        <AvatarImage src={imgSrc ?? undefined} alt={name} />
        <AvatarFallback className="bg-black">{name.toUpperCase()[0]}</AvatarFallback>
      </Avatar>

      {/* Edit Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-1 -right-2 bg-white rounded-full shadow-lg p-2"
      >
        <Pencil className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EditableAvatar;
