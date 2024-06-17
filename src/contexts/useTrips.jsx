import { useContext } from "react";
import { TripsContext } from "./TripsContext";

export function useTrips() {
  const context = useContext(TripsContext);
  if (context === undefined)
    throw new Error("TripContext was used outside of TripProvider");
  return context;
}
