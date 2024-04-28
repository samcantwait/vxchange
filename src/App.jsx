import { useState } from "react";
import Calendar from "./calendar/Calendar";
import InfoBar from "./header/InfoBar";
import NavigationBar from "./header/NavigationBar";
import { assignedTrips } from "./trips";
import Trips from "./trips/Trips";
import { tripPool } from "./tripPool";

function App() {
  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [tripScreen, setTripScreen] = useState("roster");
  const [availTrips, setAvailTrips] = useState(tripPool);
  const [heldTrips, setHeldTrips] = useState({ roster: [], pool: [] });

  function handleSelectTrip(e, trip) {
    console.log(e);
    if (
      !e.target.classList.contains("trip-image") &&
      !e.target.classList.contains("trip-select")
    ) {
      const isSelected = trip?.selected === true;
      if (tripScreen === "pool") {
        setAvailTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      } else
        setRosterTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
    } else {
      if (tripScreen === "roster") {
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
      }
      if (tripScreen === "pool") {
        setHeldTrips((t) => {
          if (heldTrips.pool.indexOf(trip) !== -1) {
            const filtered = t.pool.filter((s) => s.id !== trip.id);
            return { ...t, pool: [...filtered] };
          } else
            return {
              ...t,
              pool: [...t.pool, trip],
            };
        });
      }
    }
  }

  function handleChangeView(view) {
    setTripScreen(view);
  }

  console.log(heldTrips);

  return (
    <div className="content-wrapper">
      <header>
        <InfoBar tfp={73.2} />
        <NavigationBar onChangeView={handleChangeView} heldTrips={heldTrips} />
      </header>
      <main className="main-content">
        <div className="aside-wrapper">
          <div className="aside">
            <Calendar
              rosterTrips={rosterTrips}
              onSelectTrip={handleSelectTrip}
            />
          </div>
        </div>
        <div className="main-wrapper">
          <div className="main">
            <Trips
              rosterTrips={rosterTrips}
              onSelectTrip={handleSelectTrip}
              tripScreen={tripScreen}
              availTrips={availTrips}
              heldTrips={heldTrips}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
