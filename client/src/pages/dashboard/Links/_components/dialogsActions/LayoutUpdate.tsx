import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, THUMBNAIlSLAYOUT } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { LoadingButton } from "@/components/global/Button";

type Props = {
  link: Link;
};

const LayoutUpdate = ({ link }: Props) => {
  const [selectedLayout, setSelectedLayout] = useState<THUMBNAIlSLAYOUT | null>(
    link?.thumbnail_layout
  );
  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;
  const { funcLoading } = useAppSelector((state) => state.links);

  const onSubmit = () => {
    dispatch(
      updateLink({
        id: link.id,
        obj: {
          thumbnail_layout: selectedLayout,
        },
      })
    );
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        defaultValue={selectedLayout ?? ""}
        onValueChange={(e: any) => {
          setSelectedLayout(e);
        }}
        className="space-y-4"
      >
        {Object.values(THUMBNAIlSLAYOUT)?.map((layout, i) => (
          <div
            className={cn(
              "flex items-center p-4 border rounded-md cursor-pointer",
              selectedLayout === layout
                ? "bg-gray-100 border-blue-500"
                : "border-gray-200"
            )}
            key={`radio${i}`}
          >
            <RadioGroupItem value={layout} id={layout} />
            <Label htmlFor={layout} className="ml-4 font-medium text-gray-800">
              {layout}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedLayout === THUMBNAIlSLAYOUT.LARGE && !link?.thumbnail && (
        <div className="text-xs text-red-500">
          Add Thumbnail before setting this layout
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <LoadingButton
          disabled={
            !link?.thumbnail && selectedLayout === THUMBNAIlSLAYOUT.LARGE
          }
          type="button"
          loading={funcLoading}
          onClick={onSubmit}
          text="Save"
        />
      </div>
    </div>
  );
};

export default LayoutUpdate;
