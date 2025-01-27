import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link} from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/global/Button";

type Props = {
  link: Link;
};

const ThumbnailUpdate = ({ link }: Props) => {
  const [thumbnail, setThumbnail] = useState<string | null>(link?.thumbnail ?? null);
  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;
  const {funcLoading} = useAppSelector(state => state.links)

  const onSubmit = () => {
    dispatch(
      updateLink({
        id: link.id,
        obj: {
          thumbnail: thumbnail,
        },
      })
    );
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Enter the thumbnail url"
        value={thumbnail ?? ""}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <LoadingButton type="button" loading={funcLoading} onClick={onSubmit} text="Save"/>
      </div>
    </div>
  );
};

export default ThumbnailUpdate;
