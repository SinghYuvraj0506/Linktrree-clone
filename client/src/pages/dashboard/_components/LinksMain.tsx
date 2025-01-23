import { Button } from "@/components/ui/button";
import SocialProfile from "./SocialProfile";
import { Plus } from "lucide-react";
import { useState } from "react";
import LinksUpdateDialog from "./LinksUpdateDialog";
import { LINKTYPE } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import LinkCard from "./LinkCards";
import { linkActions } from "@/lib/features/linksSlice";
import { useToast } from "@/hooks/use-toast";

const LinksMain = () => {
  const [linksDialog, setLinksDialog] = useState<{
    open: boolean;
    order: number | null;
    type: LINKTYPE;
  }>({ open: false, order: 0, type: LINKTYPE.OTHERS });

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { links } = useAppSelector((state) => state.links);
  const { updateLink, deleteLink } = linkActions;

  const handleEdit = (
    id: string,
    field: "url" | "title" | "active",
    value: string | boolean
  ) => {
    if (value === "") {
      return toast({
        title: "Error",
        description: "Enter a valid value",
        variant: "destructive",
      });
    }

    dispatch(
      updateLink({
        id,
        obj: {
          [field]: value,
        },
      })
    );

    toast({
      title: "Success",
      description: "Link Updated Successfully",
      variant: "default",
    });
  };

  const handleDelete = (id: string) => {
    dispatch(
      deleteLink(id)
    );

    toast({
      title: "Success",
      description: "Link Deleted Successfully",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <SocialProfile />

      <Button
        onClick={() =>
          setLinksDialog({
            open: true,
            order: links.length,
            type: LINKTYPE.OTHERS,
          })
        }
      >
        <Plus className="w-5 h-5" />
        Add
      </Button>

      {links?.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <LinksUpdateDialog
        isOpen={linksDialog.open}
        onClose={() => {
          setLinksDialog({
            open: false,
            order: links.length,
            type: LINKTYPE.OTHERS,
          });
        }}
        order={linksDialog.order}
        type={linksDialog.type}
      />
    </div>
  );
};

export default LinksMain;
