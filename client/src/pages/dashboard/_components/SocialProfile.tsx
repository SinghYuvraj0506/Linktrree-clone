import EditableAvatar from "@/components/global/EditableAvatar";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Instagram, Mail, Youtube, XIcon } from "lucide-react";

const socialIcons = [
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: XIcon, label: "Twiiter" },
  { icon: Mail, label: "Email" },
];

const SocialProfile = () => {
  return (
    <div className="flex gap-6">
      <EditableAvatar name="Yuvraj" />
      <div className="flex flex-col gap-1 mt-2">
        <p className="font-bold">Yuvraj</p>
        <p className="text-gray-500">hello</p>

        {/* Social icons */}
        <div className="flex gap-2 items-center relative right-2">
          {socialIcons.map((social) => (
            <Button
              key={social.label}
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 rounded-full"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 rounded-full"
            aria-label="Add social"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;
