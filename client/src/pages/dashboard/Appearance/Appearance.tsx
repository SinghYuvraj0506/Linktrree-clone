import React, { useState } from "react";
import BackgroundSelector from "./_components/Backgroundselector";
import ButtonStyleSelector from "./_components/ButtonSelector";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { appearanceActions } from "@/lib/features/appearanceSlice";
import { useToast } from "@/hooks/use-toast";

const AppearancePage = () => {
  const dispatch = useAppDispatch()
  const {updateUserAppearance} = appearanceActions
  const {data} = useAppSelector(state => state.appearance)
  const {toast} = useToast()

  const handleUpdate = () => {
    dispatch(updateUserAppearance(data))
    toast({
      title: "Success",
      description: "Appearance Updated Successfully",
      variant: "default",
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <Button className="w-max ml-auto" onClick={handleUpdate}>Apply Changes</Button>
      <BackgroundSelector />
      <ButtonStyleSelector />
    </div>
  );
};

export default AppearancePage;
