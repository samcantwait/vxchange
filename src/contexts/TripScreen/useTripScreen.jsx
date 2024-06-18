import { useContext } from "react";
import { TripScreenContext } from "./TripScreenContext";

export function useTripScreen() {
  const context = useContext(TripScreenContext);
  if (context === undefined)
    throw new Error("TripScreenContext was used outside TripScreenProvider");
  return context;
}
