import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { Link } from "@/lib/types";

type Props = {
  link: Link,
  onDelete: (id:string) => void
  onEdit: (id:string, field: "title" | "url" | "active", value:string | boolean) => void
}

const LinkCard = ({ link, onDelete, onEdit }:Props) => {
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
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
              <span className="text-sm ml-2">0 clicks</span>
            </div>
          </div>

          {/* Right Actions */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
