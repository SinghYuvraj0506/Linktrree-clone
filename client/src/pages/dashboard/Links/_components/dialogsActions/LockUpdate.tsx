import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, LINK_LOCK_TYPE } from "@/lib/types";
import { useAppDispatch } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { LoadingButton } from "@/components/global/Button";

type Props = {
    link:Link
};

const LockUpdate = ({ link }: Props) => {
  const [lockType, setLockType] = useState<LINK_LOCK_TYPE>(link?.lock_type);
  const [lockData, setLockData] = useState<any>(link?.lock_data ?? {});
  const [isLocked, setIsLocked] = useState<boolean>(link?.isLocked);

  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;

  const handleSave = () => {
    if (lockType === LINK_LOCK_TYPE.CODE && (!lockData.code || lockData.code.length !== 4)) {
      alert("Please enter a valid 4-digit code.");
      return;
    }

    if (lockType === LINK_LOCK_TYPE.DOB && (!lockData.minAge || lockData.minAge < 1)) {
      alert("Please enter a valid minimum age.");
      return;
    }

    dispatch(
      updateLink({
        id: link?.id,
        obj: {
          isLocked,
          lock_type: lockType,
          lock_data: lockData,
        },
      })
    );
  };

  const renderLockOptions = () => {
    switch (lockType) {
      case LINK_LOCK_TYPE.CODE:
        return (
          <div>
            <label className="block mb-2 text-sm font-medium">4-Digit Code</label>
            <Input
              placeholder="Enter 4-digit code"
              value={lockData.code || ""}
              onChange={(e) => setLockData({ ...lockData, code: e.target.value })}
              maxLength={4}
            />
          </div>
        );

      case LINK_LOCK_TYPE.DOB:
        return (
          <div>
            <label className="block mb-2 text-sm font-medium">Minimum Age</label>
            <Input
              type="number"
              placeholder="Enter minimum age"
              value={lockData.minAge || ""}
              onChange={(e) => setLockData({ ...lockData, minAge: parseInt(e.target.value, 10) })}
            />
          </div>
        );

      case LINK_LOCK_TYPE.SENSITIVE:
        return <p className="text-sm text-muted-foreground">This link is marked as sensitive.</p>;

      case LINK_LOCK_TYPE.SUBSCRIBE:
        return <p className="text-sm text-muted-foreground">This link requires a subscription.</p>;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Lock Status Toggle */}
      <div className="flex items-center space-x-4">
        <label className="block text-sm font-medium">Lock Status</label>
        <Button
          variant={isLocked ? "default" : "outline"}
          size="sm"
          onClick={() => setIsLocked((prev) => !prev)}
        >
          {isLocked ? "Locked" : "Unlocked"}
        </Button>
      </div>

      {/* Lock Type Selection */}
      {isLocked && (
        <div>
          <label className="block mb-2 text-sm font-medium">Lock Type</label>
          <Select
            defaultValue={lockType}
            onValueChange={(value: LINK_LOCK_TYPE) => {
              setLockType(value);
              setLockData({}); // Reset lock data when lock type changes
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select lock type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(LINK_LOCK_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Lock Type Options */}
      {isLocked && renderLockOptions()}

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <LoadingButton type="button" text="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default LockUpdate;
