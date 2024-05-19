import { fetchParkingLots } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const useParkingLots = () => {
  return useQuery({
    queryKey: ["parking-lots"],
    queryFn: fetchParkingLots,
  });
};

export default useParkingLots;
