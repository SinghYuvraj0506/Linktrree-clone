import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { createLinkSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/global/Button";
import { linkActions } from "@/lib/features/linksSlice";
import { useEffect } from "react";
import { LINKTYPE } from "@/lib/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: LINKTYPE;
  order: number | null;
};

const LinksUpdateDialog = ({ isOpen, onClose, type, order }: Props) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { error, funcLoading } = useAppSelector((state) => state.links);

  const { createLink, clearError } = linkActions;

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    shouldUnregister: false,
    defaultValues: {
      title: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof createLinkSchema>) {
    dispatch(createLink(values));
    toast({
      title: "Success",
      description: "Link Added Successfully",
      variant: "default",
    });
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (typeof order === "number") {
      form.setValue("order", order);
    }
    if (type) {
      form.setValue("type", type);
    }
  }, [order, type]);

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create Link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* URL Field */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    URL <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a valid URL (e.g., https://example.com)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dialog Footer */}
            <DialogFooter className="space-x-2">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto"
                onClick={onClose}
              >
                Cancel
              </Button>
              <LoadingButton type="submit" loading={funcLoading} text="Add Link" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinksUpdateDialog;
