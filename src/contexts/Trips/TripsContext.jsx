import { createContext, useState } from "react";
import { assignedTrips } from "../../trips";
import { tripPool } from "../../tripPool";
import { useTripScreen } from "../TripScreen/useTripScreen";

export const TripsContext = createContext();

// Function which takes the current state(arr) and updates it based on the inputed prop and boolean
function changeTrips(arr, trip, prop, propBool) {
  return arr.map((i) =>
    i.id === trip.id ? { ...i, [prop]: !propBool } : { ...i, selected: false }
  );
}

function insertTrip(arr, trip) {
  //function to insert trip into correct location
  const [month, day, year] = trip.startDate.split("-");

  for (let i = 0; i < arr.length; i++) {
    const [tripMonth, tripDay, tripYear] = arr[i].startDate.split("-");
    const [nextMonth, nextDay, nextYear] = arr[i + 1].startDate.split("-");
    const tripDate = Date.parse(new Date(year, month, day));
    const arrDate = Date.parse(new Date(tripYear, tripMonth, tripDay));
    const nextDate =
      i !== arr.length - 1
        ? Date.parse(new Date(nextYear, nextMonth, nextDay))
        : Infinity;

    if (arrDate === tripDate) {
      //Need to address sorting multiple trips on same date but at different times.
      const tripStart = parseInt(trip.report.replace(":", ""));
      const arrStart = parseInt(arr[i].report.replace(":", ""));
      // if (tripStart < arrStart)
      //look at start time
    }
    if (arrDate < tripDate) continue;
    if (i === arr.length - 1 || tripDate < nextDate) {
      arr.splice(i, 0, trip);
      return;
    }
  }
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

  function handleChangeTrip(option, crew) {
    // REMEMBER TO RESET SELECTED AND CHECKED ON CHANGED TRIPS!!!!

    // do something with the trip and also call the onSelectTrip function
    //Use useReducer here!
    if (option === "Swap") {
      const rosterTrip = heldTrips.roster[0];
      const poolTrip = heldTrips.pool[0];

      setRosterTrips((t) => {
        const newRoster = t.filter((i) => i.id !== rosterTrip.id);
        insertTrip(newRoster, poolTrip);
        return [...newRoster];
      });
      setAvailTrips((t) => {
        const newAvail = t.filter((i) => i.id !== poolTrip.id);
        insertTrip(newAvail, rosterTrip);
        return [...newAvail];
      });
      console.log(rosterTrip, poolTrip, crew);

      setHeldTrips({ roster: [], pool: [] });

      // adds to the end of array, need to sort?
    }

    // console.log(option, crew);
  }

  return (
    <TripsContext.Provider
      value={{
        rosterTrips,
        handleSelectCalendarTrip,
        handleSelectTrip,
        handleChangeTrip,
        heldTrips,
        availTrips,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export { TripsProvider };
