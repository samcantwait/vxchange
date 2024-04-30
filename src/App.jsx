import { useState } from "react";
import Calendar from "./calendar/Calendar";
import InfoBar from "./header/InfoBar";
import NavigationBar from "./header/NavigationBar";
import { assignedTrips } from "./trips";
import Trips from "./trips/Trips";
import { tripPool } from "./tripPool";

function App() {
  const [allTrips, setAllTrips] = useState({
    rosterTrips: assignedTrips,
    availTrips: tripPool,
    heldTrips: { roster: [], pool: [] },
  });
  const [tripScreen, setTripScreen] = useState("roster");

  function handleSelectTrip(e, trip) {
    const isSelected = trip.selected;
    if (tripScreen === "roster") {
      setAllTrips((a) => {
        const held =
          a.heldTrips.roster.indexOf(trip) !== -1
            ? [...a.heldTrips.roster.filter((s) => s.id !== trip.id)]
            : [...a.heldTrips.roster, trip];

        const extended = a.rosterTrips.map((i) =>
          i.id === trip.id ? { ...i, selected: !isSelected } : i
        );

        console.log("held: ", held);
        console.log("extended: ", extended);

        // changing one object at a time works, but it breaks when changing two or more
        return {
          rosterTrips: extended,
          availTrips: a.availTrips,
          heldTrips: {
            roster: held,
            pool: a.heldTrips.pool,
          },
        };
      });
    }
    // else
    // setAllTrips((t) => ({
    //   rosterTrips: t.rosterTrips.map((i) =>
    //     i.id === trip?.id
    //       ? { ...i, selected: !isSelected }
    //       : { ...i, selected: false }
    //   ),
    //   availTrips: t.availTrips,
    //   heldTrips: t.heldTrips,
    // }));
    // if (
    //   e.target.classList.contains("trip-image") ||
    //   e.target.classList.contains("trip-select")
    // ) {
    //   if (tripScreen === "roster") {
    //     allTrips.map((a) => {
    //       console.log(a);
    //     });
    // setAllTrips((a) => {
    // console.log("a is: ", a);
    //   const held = a.heldTrips.map((t) => {
    //     if (a.heldTrips.roster.indexOf(trip) !== -1) {
    //       const filtered = t.roster.filter((s) => s.id !== trip.id);
    //       return { ...t, roster: [...filtered] };
    //     } else
    //       return {
    //         ...t,
    //         roster: [...t.roster, trip],
    //       };
    //   });
    //   return {
    //     rosterTrips: a.rosterTrips,
    //     availTrips: a.availTrips,
    //     heldTrips: held,
    //   };
    // });

    // console.log("held trips roster: ", held);

    // setAllTrips((a) => ({
    //   rosterTrips: a.rosterTrips,
    //   availTrips: a.availTrips,
    //   heldTrips: held,
    // }));
    // }
    // if (tripScreen === "pool") {
    //   const held = allTrips.heldTrips.map((t) => {
    //     if (heldTrips.pool.indexOf(trip) !== -1) {
    //       const filtered = t.pool.filter((s) => s.id !== trip.id);
    //       return { ...t, pool: [...filtered] };
    //     } else
    //       return {
    //         ...t,
    //         pool: [...t.pool, trip],
    //       };
    //   });
    //   console.log("held trips: ", held);
    //   setAllTrips((a) => ({
    //     rosterTrips: a.rosterTrips,
    //     availTrips: a.availTrips,
    //     heldTrips: held,
    //   }));
    // }
    // }
  }

  console.log(allTrips);

  function handleChangeView(view) {
    setTripScreen(view);
  }

  return (
    <div className="content-wrapper">
      <header>
        <InfoBar tfp={73.2} />
        <NavigationBar onChangeView={handleChangeView} allTrips={allTrips} />
      </header>
      <main className="main-content">
        <div className="aside-wrapper">
          <div className="aside">
            <Calendar allTrips={allTrips} onSelectTrip={handleSelectTrip} />
          </div>
        </div>
        <div className="main-wrapper">
          <div className="main">
            <Trips
              allTrips={allTrips}
              onSelectTrip={handleSelectTrip}
              tripScreen={tripScreen}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
