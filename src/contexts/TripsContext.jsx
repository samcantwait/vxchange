import { createContext, useState } from "react";
import { assignedTrips } from "../trips";
import { tripPool } from "../tripPool";
import { useTripScreen } from "./TripScreenContexts";

export const TripsContext = createContext();

function TripsProvider({ children }) {
  const { tripScreen } = useTripScreen();

  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [availTrips, setAvailTrips] = useState(tripPool);
  const [heldTrips, setHeldTrips] = useState({
    roster: [],
    pool: [],
  });

  function handleSelectTrip(e, trip) {
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
            return {
              ...t,
              pool: [...t.pool, { ...trip, checked: true, selected: false }],
            };
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
            return {
              ...t,
              roster: [
                ...t.roster,
                { ...trip, checked: true, selected: false },
              ],
            };
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
        if (trip.isAssigned) {
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
        }
      } else {
        if (trip.isAssigned) {
          setHeldTrips((t) => {
            const newRoster = t.roster.map((i) =>
              i.id === trip.id ? { ...i, selected: !isSelected } : { ...i }
            );
            return { roster: newRoster, pool: t.pool };
          });
        } else {
          setHeldTrips((t) => {
            const newPool = t.pool.map((i) =>
              i.id === trip.id ? { ...i, selected: !isSelected } : { ...i }
            );
            return { roster: t.roster, pool: newPool };
          });
        }
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
