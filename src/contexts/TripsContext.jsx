import { createContext, useState } from "react";
import { assignedTrips } from "../trips";
import { tripPool } from "../tripPool";
import { useTripScreen } from "./TripScreenContexts";

export const TripsContext = createContext();

// Function which takes the current state(arr) and updates it based on the inputed prop and boolean
function changeTrips(arr, trip, prop, propBool) {
  return arr.map((i) =>
    i.id === trip.id ? { ...i, [prop]: !propBool } : { ...i, selected: false }
  );
}

function TripsProvider({ children }) {
  const { tripScreen } = useTripScreen();

  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [availTrips, setAvailTrips] = useState(tripPool);
  const [heldTrips, setHeldTrips] = useState({
    roster: [],
    pool: [],
  });

  function changeHeldTrips(arr, trip, prop) {
    const found = heldTrips[prop].find((t) => t.id === trip.id);
    if (found) {
      const filtered = arr[prop].filter((s) => s.id !== trip.id);
      return { ...arr, [prop]: [...filtered] };
    } else {
      return {
        ...arr,
        [prop]: [...arr[prop], { ...trip, checked: true, selected: false }],
      };
    }
  }

  function handleSelectCalendarTrip(trip) {
    console.log(trip);
    const isSelected = trip.selected === true;
    setRosterTrips((t) => changeTrips(t, trip, "selected", isSelected));
  }

  function handleSelectTrip(e, trip) {
    const isSelected = trip?.selected === true;
    const isChecked = trip?.checked === true;

    if (tripScreen === "pool") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setAvailTrips((t) => changeTrips(t, trip, "checked", isChecked));
        setHeldTrips((t) => changeHeldTrips(t, trip, "pool"));
      } else {
        setAvailTrips((t) => changeTrips(t, trip, "selected", isSelected));
      }
    } else if (tripScreen === "roster") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setRosterTrips((t) => changeTrips(t, trip, "checked", isChecked));
        setHeldTrips((t) => changeHeldTrips(t, trip, "roster"));
      } else {
        setRosterTrips((t) => changeTrips(t, trip, "selected", isSelected));
      }
    } else {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        if (trip.isAssigned) {
          setRosterTrips((t) => changeTrips(t, trip, "checked", isChecked));

          setHeldTrips((t) => changeHeldTrips(t, trip, "roster"));
        } else {
          setAvailTrips((t) => changeTrips(t, trip, "checked", isChecked));
          setHeldTrips((t) => changeHeldTrips(t, trip, "pool"));
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
      value={{
        rosterTrips,
        handleSelectCalendarTrip,
        handleSelectTrip,
        heldTrips,
        availTrips,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export { TripsProvider };
