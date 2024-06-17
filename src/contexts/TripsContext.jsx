import { createContext, useState } from "react";
import { assignedTrips } from "../trips";
import { tripPool } from "../tripPool";
import { useTripScreen } from "./TripScreenContexts";
import { flushSync } from "react-dom";

export const TripsContext = createContext();

function TripsProvider({ children }) {
  const { tripScreen } = useTripScreen();

  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [availTrips, setAvailTrips] = useState(tripPool);
  const [heldTrips, setHeldTrips] = useState({
    roster: [],
    pool: [],
  });

  // function handleSetTrips(callback, isSelected, isChecked) {
  //   callback(t =>  t.map((i) =>
  //     i.id === trip?.id
  //       ? { ...i, checked: !isChecked }
  //       : { ...i, selected: false }
  //   ))
  // }

  function handleSelectTrip(e, trip) {
    console.log(e);

    const isSelected = trip?.selected === true;
    const isChecked = trip?.checked === true;

    if (tripScreen === "pool") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setAvailTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, checked: !isChecked }
              : { ...i, selected: false }
          )
        );
        setHeldTrips((t) => {
          const found = heldTrips.pool.find((t) => t.id === trip.id);
          if (found) {
            const filtered = t.pool.filter((s) => s.id !== trip.id);
            return { ...t, pool: [...filtered] };
          } else {
            trip.checked = true;
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
        setRosterTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, checked: !isChecked }
              : { ...i, selected: false }
          )
        );
        setHeldTrips((t) => {
          const found = heldTrips.roster.find((t) => t.id === trip.id);
          if (found) {
            const filtered = t.roster.filter((s) => s.id !== trip.id);
            return { ...t, roster: [...filtered] };
          } else {
            trip.checked = true;
            return { ...t, roster: [...t.roster, trip] };
          }
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
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        console.log(heldTrips);

        setHeldTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, checked: !isChecked }
              : { ...i, selected: false }
          )
        );
        setHeldTrips((t) => {
          const found = heldTrips.roster.find((t) => t.id === trip.id);
          if (found) {
            const filtered = t.roster.filter((s) => s.id !== trip.id);
            return { ...t, roster: [...filtered] };
          } else {
            trip.checked = true;
            return { ...t, roster: [...t.roster, trip] };
          }
        });
      } else {
        console.log(heldTrips);
        setHeldTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      }
    }
  }

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
