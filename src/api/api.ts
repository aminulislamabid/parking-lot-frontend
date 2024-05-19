import { ParkingLot } from "@/constants";
import api from "./axios";

export const fetchParkingLots = async () => {
  const response = await api.get("/parking-lot/get-parking-lots");

  return response.data;
};

export const createParkingLot = async (data: ParkingLot) => {
  const response = await api.post("/parking-lot/create-parking-lot", data);

  return response.data;
};

export const parkVehicle = async (slotId: string) => {
  const response = await api.patch("/parking-slot/park", {
    slotId: slotId,
  });

  return response.data;
};

export const unParkVehicle = async (slotId: string) => {
  const response = await api.patch("/parking-slot/unpark", {
    slotId: slotId,
  });

  return response.data;
};

export const deleteParkingLot = async (id: string) => {
  const response = await api.delete(`/parking-lot/${id}`);

  return response.data;
};
