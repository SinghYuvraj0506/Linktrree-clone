import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { LoadingButton } from "@/components/global/Button";
import { Link, LINK_ANIMATION_TYPE } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  link: Link;
};

const PrioritizeLinkUpdate = ({ link }: Props) => {
  const [isPriority, setIsPriority] = useState<boolean>(link?.prioritize);
  const [animationType, setAnimationType] = useState<LINK_ANIMATION_TYPE>(
    link.animation_type
  );
  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;

  const { funcLoading } = useAppSelector((state) => state.links);

  const handleSave = () => {
    dispatch(
      updateLink({
        id: link?.id,
        obj: {
          prioritize:isPriority,
          animation_type:animationType,
        },
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Prioritize Link Option */}
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={isPriority}
            onCheckedChange={(checked) => setIsPriority(!!checked)}
            id="priority"
            disabled={link?.prioritize}
          />
          <label htmlFor="priority" className="text-sm font-medium">
            Prioritize This Link
          </label>
        </div>

        {isPriority && (
          <div className="text-red-500 text-sm">
            You can only prioritize one link at a time.
          </div>
        )}
      </div>

      {/* Select Animation Type */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="animationType" className="text-sm font-medium">
          Select Animation Type
        </label>
        <Select
          value={animationType}
          onValueChange={(e: any) => setAnimationType(e)}
          disabled={!isPriority}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Animation Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LINK_ANIMATION_TYPE.NONE} disabled={isPriority}>None</SelectItem>
            <SelectItem value={LINK_ANIMATION_TYPE.BUZZ}>Buzz</SelectItem>
            <SelectItem value={LINK_ANIMATION_TYPE.WOBBLE}>Wobble</SelectItem>
            <SelectItem value={LINK_ANIMATION_TYPE.POP}>Pop</SelectItem>
            <SelectItem value={LINK_ANIMATION_TYPE.SWIPE}>Swipe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-end gap-2">
        <LoadingButton
          type="button"
          loading={funcLoading}
          onClick={handleSave}
          text="Save"
        />
      </div>
    </div>
  );
};

export default PrioritizeLinkUpdate;
