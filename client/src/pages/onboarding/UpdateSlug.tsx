import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usernameFormSchema } from "@/lib/schemas";
import { LoadingButton } from "@/components/global/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import { authActions } from "@/lib/features/authSlice";

type Props = {
  handleNext: () => void
}

const UpdateSlug = ({handleNext}:Props) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { funcLoading, error } = useAppSelector((state) => state.auth);
  const { checkSlugAvailability, clearError, updateUser } = authActions;

  const [isAvailable, setIsAvailable] = useState(false);
  const [isSlugLoading, setIsSlugLoading] = useState(false);

  const form = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    shouldUnregister: false,
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof usernameFormSchema>) {
    if (!isAvailable) {
      return await checkUsername(values.username);
    }

    dispatch(
      updateUser({
        slug: values.username,
      })
    );

    handleNext()
  }

  const checkUsername = async (username: string) => {
    setIsAvailable(false)
    setIsSlugLoading(true);
    try {
      const res: any = await dispatch(checkSlugAvailability(username));
      setIsAvailable(res.payload?.data?.available);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message as string,
        variant: "destructive",
      });
    } finally {
      setIsSlugLoading(false);
    }
  };


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
    <div className="flex flex-col gap-10 w-1/3 mx-auto my-[30vh]">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Choose your username
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                    placeholder="linktree.com/username"
                    {...field} 
                    onChange={async (e)=>{
                        field.onChange(e)
                        if(e.target.value !== "" && form.formState.isValid){
                            await checkUsername(e.target.value)
                        }
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                  {form.getValues("username") !== "" && !isSlugLoading && form.formState.isValid && (
                    <FormDescription
                      className={clsx(
                        isAvailable ? "text-green-500" : "text-red-600"
                      )}
                    >
                      {isAvailable
                        ? "Username is available"
                        : "Username not available"}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={isAvailable ? funcLoading : isSlugLoading}
              text={isAvailable ? "Update" : "Check"}
            />
          </form>
        </Form>
    </div>
  );
};


export default UpdateSlug;
