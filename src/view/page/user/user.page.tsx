import { parkVehicle, unParkVehicle } from "@/api/api";
import ParkingSlot from "@/components/parking-slot";
import { toast } from "@/components/ui/use-toast";
import { ParkingLot, ParkingSlotProps } from "@/constants";
import useParkingLots from "@/hooks/useParkingLots";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const User = () => {
  const queryClient = useQueryClient();

  const { data: parkingLots, isLoading, isError } = useParkingLots();

  const {
    mutate: mutatePark,
    isPending: isParkingPending,
    isSuccess: isParkingSuccess,
    isError: isParkingError,
    error: parkError,
    data: parkData,
  } = useMutation({
    mutationFn: parkVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parking-lots"],
      });
    },
  });

  const {
    mutate: mutateUnPark,
    isPending: isUnParkingPending,
    isSuccess: isUnParkingSuccess,
    isError: isUnParkingError,
    error: unParkError,
    data: unParkData,
  } = useMutation({
    mutationFn: unParkVehicle,
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

  if (isParkingError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: parkError.message,
    });
  }

  if (isParkingSuccess) {
    toast({
      title: "Success",
      description: parkData.message,
    });
  }

  if (isUnParkingError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: unParkError.message,
    });
  }

  if (isUnParkingSuccess) {
    toast({
      title: "Success",
      description: unParkData.message,
    });
  }

  return (
    <div className="mt-20">
      <div className="text-center space-y-2">
        <h1 className="text-center font-semibold text-2xl">
          Park You Vehicle Here
        </h1>
        <p className="text-muted-foreground">
          <strong className="text-destructive">Note:</strong> Click any
          available slot to park your vehicle and <br /> click again to unpark
          your vehicle
        </p>
      </div>

      <div className="flex items-center gap-3 mt-14">
        <div className="w-4 h-4 bg-primary"></div>
        <p className="font-semibold">Free</p>
        <div className="w-4 h-4 bg-red-300"></div>
        <p className="font-semibold">Occupied</p>
      </div>

      {parkingLots.length === 0 && (
        <div className="flex justify-center items-center mt-60">
          <p>No parking lots created</p>
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-4 mt-10 ${
          isParkingPending || isUnParkingPending
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        {parkingLots.map((lot: ParkingLot) => (
          <div key={lot.id} className="space-y-6">
            <h2 className="text-lg font-semibold">{lot.name}</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {lot.slots?.map((slot: ParkingSlotProps) => (
                  <div
                    key={slot.id}
                    className="cursor-pointer"
                    onClick={() => {
                      if (slot.id && slot.status === "free") {
                        mutatePark(slot.id);
                      } else if (slot.id && slot.status === "occupied") {
                        mutateUnPark(slot.id);
                      } else {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description:
                            "Slot not found try again refresh the page",
                        });
                      }
                    }}
                  >
                    <ParkingSlot status={slot.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
