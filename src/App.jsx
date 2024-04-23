import { useState } from "react";
import Calendar from "./calendar/Calendar";
import InfoBar from "./header/InfoBar";
import NavigationBar from "./header/NavigationBar";
import { trips } from "./Trips";
import Trips from "./trips/Trips";

function App() {
  const [allTrips, setAllTrips] = useState(trips);

  function handleSelectTrip(trip) {
    const isSelected = trip?.selected === true;
    setAllTrips((t) =>
      t.map((i) =>
        i.id === trip?.id
          ? { ...i, selected: !isSelected }
          : { ...i, selected: false }
      )
    );
  }

  return (
    <div className="content-wrapper">
      <header>
        <InfoBar tfp={73.2} />
        <NavigationBar />
      </header>
      <main className="main-content">
        <div className="aside-wrapper">
          <div className="aside">
            <Calendar allTrips={allTrips} onSelectTrip={handleSelectTrip} />
          </div>
        </div>
        <div className="main-wrapper">
          <div className="main">
            <Trips allTrips={allTrips} onSelectTrip={handleSelectTrip} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
