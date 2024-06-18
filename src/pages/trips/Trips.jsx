import { useTripScreen } from "../../contexts/TripScreen/useTripScreen";
import { useTrips } from "../../contexts/Trips/useTrips";
import Trip from "../../components/Trip/Trip";
import TripSelect from "../../components/TripSelectForm/TripSelect";

export default function Trips() {
  const { tripScreen } = useTripScreen();
  const { rosterTrips, availTrips, heldTrips } = useTrips();

  // Switch statement is used to determine what to display based upon the value of the tripScreen state. ('roster', 'pool', or 'trade')
  function chooseScreen() {
    switch (tripScreen) {
      case "roster":
        return (
          <>
            {rosterTrips.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}{" "}
            <TripSelect />
          </>
        );
      case "pool":
        return (
          <>
            {availTrips.map((trip) => {
              return <Trip trip={trip} key={crypto.randomUUID()} />;
            })}{" "}
            <TripSelect />
          </>
        );
      case "trade":
        if (!heldTrips.roster.length && !heldTrips.pool.length)
          return (
            <div className="trip-box">
              <p>No trip added.</p>
            </div>
          );
        return (
          <>
            {heldTrips.roster.length > 0 && (
              <>
                <h2>Roster</h2>
                {heldTrips.roster.map((trip) => {
                  return <Trip trip={trip} key={crypto.randomUUID()} />;
                })}
                <hr style={{ margin: "30px 0 20px" }} />
              </>
            )}

            {heldTrips.pool.length > 0 && (
              <>
                <h2>Trip Pool</h2>
                {heldTrips.pool.map((trip) => {
                  return <Trip trip={trip} key={crypto.randomUUID()} />;
                })}
              </>
            )}
            <TripSelect />
          </>
        );
      default:
        return;
    }
  }

  return (
    <div className="main-wrapper">
      <div className="main">
        <div className="trips-wrapper">{chooseScreen()}</div>
      </div>
    </div>
  );
}
