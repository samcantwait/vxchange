import { useState } from "react";
import Calendar from "./calendar/Calendar";
import InfoBar from "./header/InfoBar";
import NavigationBar from "./header/NavigationBar";
import { trips } from "./Trips";
import Trips from "./trips/Trips";
import { tripPool } from "./tripPool";

function App() {
  const [allTrips, setAllTrips] = useState(trips);
  const [tripScreen, setTripScreen] = useState("roster");
  const [availTrips, setAvailTrips] = useState(tripPool);

  function handleSelectTrip(trip) {
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
      setAllTrips((t) =>
        t.map((i) =>
          i.id === trip?.id
            ? { ...i, selected: !isSelected }
            : { ...i, selected: false }
        )
      );
  }

  function handleChangeView(view) {
    setTripScreen(view);
  }

  function handleChangeTrip(trips) {
    console.log("in the handle change function", trips);
  }

  return (
    <div className="content-wrapper">
      <header>
        <InfoBar tfp={73.2} />
        <NavigationBar onChangeView={handleChangeView} />
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
              availTrips={availTrips}
              onChangeTrip={handleChangeTrip}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
