import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { onboardProfileFormSchema, usernameFormSchema } from "@/lib/schemas";
import { LoadingButton } from "@/components/global/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import { authActions } from "@/lib/features/authSlice";

type Props = {
  handleNext: () => void
}

const UpdateProfile = ({handleNext}:Props) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { funcLoading, error } = useAppSelector((state) => state.auth);
  const { clearError, updateUser } = authActions;

  const form = useForm<z.infer<typeof onboardProfileFormSchema>>({
    resolver: zodResolver(onboardProfileFormSchema),
    shouldUnregister: false,
    defaultValues: {
      name: "",
      image:"",
      desc: ""
    },
  });


  async function onSubmit(values: z.infer<typeof onboardProfileFormSchema>) {
    // dispatch(
    //   updateUser({
    //     slug: values.username,
    //   })
    // );

    handleNext()
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });

      dispatch(clearError());
    }
  }, [error, dispatch]);


  return (
    <div className="flex flex-col gap-10 w-1/3 mx-auto my-[20vh]">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Update Profile Details
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                   <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="linktree.com/username"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                   <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={funcLoading}
              text={"Update"}
            />
          </form>
        </Form>
    </div>
  );
};


export default UpdateProfile;
