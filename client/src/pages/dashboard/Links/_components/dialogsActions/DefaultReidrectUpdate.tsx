import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { LoadingButton } from "@/components/global/Button";
import { authActions } from "@/lib/features/authSlice";

type Props = {
  linkId: string;
  initialRedirectStatus: boolean;
};

const DefaultRedirectUpdate = ({ linkId, initialRedirectStatus }: Props) => {
  const [isDefaultRedirect, setIsDefaultRedirect] = useState<boolean>(
    initialRedirectStatus
  );
  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;
  const { updateReduirectUrl } = authActions;
  const { funcLoading } = useAppSelector((state) => state.links);

  const handleSave = () => {
    dispatch(
      updateLink({
        id: linkId,
        obj: {
          redirect: isDefaultRedirect,
        },
      })
    );
    dispatch(updateReduirectUrl(isDefaultRedirect ? linkId : null))
  };

  return (
    <div className="space-y-6">
      {/* Default Redirect Option */}
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={isDefaultRedirect}
          onCheckedChange={(checked) =>
            setIsDefaultRedirect(!!checked)
          }
          id="defaultRedirect"
        />
        <label htmlFor="defaultRedirect" className="text-sm font-medium">
          Set as Default Redirect URL
        </label>
      </div>

      {/* Save Button */}
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

export default DefaultRedirectUpdate;
