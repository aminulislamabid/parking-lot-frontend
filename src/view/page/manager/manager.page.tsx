import { deleteParkingLot } from "@/api/api";
import ParkingSlot from "@/components/parking-slot";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ParkingLot, ParkingSlotProps } from "@/constants";
import useParkingLots from "@/hooks/useParkingLots";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import CreateParkingLot from "./components/create-parking-lot";

const Manager = () => {
  const queryClient = useQueryClient();
  const { data: parkingLots, isLoading, isError } = useParkingLots();

  const {
    mutate: mutateDelete,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deleteData,
  } = useMutation({
    mutationFn: deleteParkingLot,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parking-lots"],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Error occurred showing parking lots try again",
    });
  }

  if (isDeleteError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: deleteError.message,
    });
  }

  if (isDeleteSuccess) {
    toast({
      title: "Success",
      description: deleteData.message,
    });
  }

  return (
    <div className="mt-28">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mt-14">
          <div className="w-4 h-4 bg-primary"></div>
          <p className="font-semibold">Free</p>
          <div className="w-4 h-4 bg-red-300"></div>
          <p className="font-semibold">Occupied</p>
        </div>

        <CreateParkingLot />
      </div>

      {parkingLots.length === 0 && (
        <div className="flex justify-center items-center mt-60">
          <p>No parking lots created</p>
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-4 mt-10 ${
          isDeletePending ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {parkingLots.map((lot: ParkingLot) => (
          <div key={lot.id}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">{lot.name}</h2>
              <Separator className="w-4/5" />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (lot.id) {
                    mutateDelete(lot.id);
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description:
                        "Delete parking lot failed try again refresh the page",
                    });
                  }
                }}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {lot.slots?.map((slot: ParkingSlotProps) => (
                  <ParkingSlot key={slot.id} status={slot.status} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
