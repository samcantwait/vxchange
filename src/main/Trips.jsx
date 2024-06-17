import { useTripScreen } from "../contexts/TripScreenContexts";
import { useTrips } from "../contexts/useTrips";
import Trip from "../trips/Trip";

export default function Trips() {
  const { tripScreen } = useTripScreen();
  const { rosterTrips, availTrips, heldTrips } = useTrips();
  return (
    <div className="main-wrapper">
      <div className="main">
        <div className="trips-wrapper">
          {tripScreen === "roster" &&
            rosterTrips.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}
          {tripScreen === "pool" &&
            availTrips.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}
          {tripScreen === "trade" &&
            heldTrips.roster.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}
          {tripScreen === "trade" && <h1>List of Options</h1>}
          {tripScreen === "trade" &&
            heldTrips.pool.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}
        </div>
      </div>
    </div>
  );
}
