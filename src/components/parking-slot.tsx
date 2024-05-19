import { ParkingSlotProps } from "@/constants";

const ParkingSlot = ({ status }: ParkingSlotProps) => {
  return (
    <div
      className={`${
        status === "free" ? "bg-green-300" : "bg-red-300"
      } w-60 h-64 rounded-lg flex justify-center items-center`}
    >
      <img src="/icon.svg" className="p-4" alt="" />
    </div>
  );
};

export default ParkingSlot;
