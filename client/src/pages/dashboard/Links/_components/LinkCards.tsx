import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Pencil,
  Trash2,
  GripVertical,
  LayoutPanelLeft,
  Redo2,
  Image,
  Star,
  CalendarFold,
  Lock,
  ChartNoAxesCombined,
} from "lucide-react";
import { Link } from "@/lib/types";
import ActionIcons from "./ActionIcon";
import LayoutUpdate from "./dialogsActions/LayoutUpdate";
import ThumbnailUpdate from "./dialogsActions/UpdateThumbnail";
import TimingUpdate from "./dialogsActions/TimingUpdate";
import LockUpdate from "./dialogsActions/LockUpdate";
import DefaultRedirectUpdate from "./dialogsActions/DefaultReidrectUpdate";
import PrioritizeLinkUpdate from "./dialogsActions/PriortizeUpdate";

type Props = {
  link: Link;
  onDelete: (id: string) => void;
  isRedirectUrl: boolean
  onEdit: (
    id: string,
    field: "title" | "url" | "active",
    value: string | boolean
  ) => void;
};

const LinkCard = ({ link, onDelete, onEdit, isRedirectUrl }: Props) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    onEdit(link.id, "title", title);
  };

  const handleUrlSubmit = () => {
    setIsEditingUrl(false);
    onEdit(link.id, "url", url);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing">
            <GripVertical className="text-gray-400" />
          </div>

          {/* Main Content */}
          <div className="space-y-2">
            {/* Title Section */}
            <div className="flex items-center gap-4">
              {isEditingTitle ? (
                <Input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                  className="max-w-[200px]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold">{title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* URL Section */}
            <div className="flex items-center gap-4">
              {isEditingUrl ? (
                <Input
                  autoFocus
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={handleUrlSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                  className="max-w-[300px]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 truncate">{url}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingUrl(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 text-gray-500">
              <ActionIcons
                icon={<LayoutPanelLeft className="w-4 h-4" />}
                tooltip="Layout"
                Content={<LayoutUpdate link={link}/>}
              />
              <ActionIcons
                icon={<Redo2 className={`w-4 h-4 ${isRedirectUrl && "text-blue-500"}`} />}
                tooltip="Redirect"
                Content={<DefaultRedirectUpdate linkId={link.id} initialRedirectStatus={isRedirectUrl} />}
                />
              <ActionIcons
                icon={<Image className={`w-4 h-4 ${(link?.thumbnail) && "text-blue-500"}`} />}
                tooltip="Thumbnail"
                Content={<ThumbnailUpdate link={link} />}
              />
              <ActionIcons
                icon={<Star className={`w-4 h-4 ${(link?.prioritize) && "text-blue-500"}`} />}
                tooltip="Prioritize"
                Content={<PrioritizeLinkUpdate link={link}/>}
              />
              <ActionIcons
                icon={<CalendarFold className={`w-4 h-4 ${(link?.show_time || link?.hide_time) && "text-blue-500"}`} />}
                tooltip="Schedule timings"
                Content={<TimingUpdate link={link} />}
              />
              <ActionIcons
                icon={<Lock className={`w-4 h-4 ${link?.isLocked && "text-blue-500"}`} />}
                tooltip="Lock"
                Content={<LockUpdate link={link} />}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col items-start h-full justify-between gap-4">
            <div className="flex items-center gap-4">
              <Switch
                checked={link.active}
                onCheckedChange={() => onEdit(link.id, "active", !link.active)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-500"
                onClick={() => onDelete(link.id)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
            <span className="text-sm ml-2 flex items-center gap-2 mb-2">
              <ChartNoAxesCombined className="w-4 h-4" /> {link?._count?.analytics} clicks
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
