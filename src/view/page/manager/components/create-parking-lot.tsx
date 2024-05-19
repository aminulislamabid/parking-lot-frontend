import { createParkingLot } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { formSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateParkingLot = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: createParkingLot,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parking-lots"],
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John's Parking Lot",
      slot: 4,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const [dialogueOpen, setDialogueOpen] = useState(false);

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  }

  if (isSuccess) {
    toast({
      title: "Success",
      description: data.message,
    });
  }

  return (
    <Dialog
      open={isSuccess ? false : dialogueOpen}
      onOpenChange={setDialogueOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2 font-semibold">
          <span>Create Parking Lot</span> <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slot</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating
              </Button>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateParkingLot;
