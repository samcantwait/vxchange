import { createContext, useState } from "react";
import { assignedTrips } from "../trips";
import { tripPool } from "../tripPool";
import { useTripScreen } from "./TripScreenContexts";

export const TripsContext = createContext();

function TripsProvider({ children }) {
  const { tripScreen } = useTripScreen();

  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [availTrips, setAvailTrips] = useState(tripPool);

  function handleSelectTrip(e, trip) {
    console.log(e);

    const isSelected = trip?.selected === true;
    if (tripScreen === "pool") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setHeldTrips((t) => {
          if (heldTrips.pool.indexOf(trip) !== 1) {
            const filtered = t.pool.filter((s) => s.id !== trip.id);
            return { ...t, pool: [...filtered] };
          } else {
            return { ...t, pool: [...t.pool, trip] };
          }
        });
      } else {
        setAvailTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      }
    } else if (tripScreen === "roster") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setHeldTrips((t) => {
          if (heldTrips.roster.indexOf(trip) !== -1) {
            const filtered = t.roster.filter((s) => s.id !== trip.id);
            return { ...t, roster: [...filtered] };
          } else
            return {
              ...t,
              roster: [...t.roster, trip],
            };
        });
      } else {
        setRosterTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      }
    } else {
      // make trips selected
      // setHeldTrips((t) => {
      //   t.map((i) => {
      //     return i.id === trip?.id
      //       ? { ...i, selected: !isSelected }
      //       : { ...i, selected: false };
      //   });
      // });
    }
  }

  const [heldTrips, setHeldTrips] = useState({
    roster: [],
    pool: [],
  });

  // function handleHoldTrip() {
  //   // do something with the trip and also call the onSelectTrip function
  // }

  return (
    <TripsContext.Provider
      value={{ rosterTrips, handleSelectTrip, heldTrips, availTrips }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export { TripsProvider };
