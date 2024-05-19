import ParkingSlot from "@/components/parking-slot";
import { toast } from "@/components/ui/use-toast";
import { ParkingLot, ParkingSlotProps } from "@/constants";
import useParkingLots from "@/hooks/useParkingLots";
import CreateParkingLot from "./components/create-parking-lot";

const Manager = () => {
  const { data: parkingLots, isLoading, isError } = useParkingLots();

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

      <div className="grid grid-cols-1 gap-4 mt-10">
        {parkingLots.map((lot: ParkingLot) => (
          <div key={lot.id}>
            <h2 className="text-lg font-semibold mb-6">{lot.name}</h2>
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
