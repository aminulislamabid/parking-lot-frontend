import { z } from "zod";

export type ParkingSlotProps = {
  id?: string;
  status: "free" | "occupied";
};

export const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    })
    .max(50, {
      message: "Name cannot be more than 50 characters long.",
    }),
  slot: z.coerce.number().min(1, {
    message: "Slot must be at least 1.",
  }),
});

export type ParkingLot = {
  id?: string;
  name: string;
  slots?: [];
};

export type ToastProps = {
  variant?: "default" | "destructive";
  title: string;
  description: string;
};
