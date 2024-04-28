import Trip from "./Trip";

export default function Trips({
  rosterTrips,
  onSelectTrip,
  tripScreen,
  availTrips,
  heldTrips,
}) {
  return (
    <div className="trips-wrapper">
      {tripScreen === "roster" &&
        rosterTrips.map((trip) => {
          return (
            <Trip
              trip={trip}
              key={crypto.randomUUID()}
              selectTrip={onSelectTrip}
              heldTrips={heldTrips}
            />
          );
        })}
      {tripScreen === "pool" &&
        availTrips.map((trip) => {
          return (
            <Trip
              trip={trip}
              key={crypto.randomUUID()}
              selectTrip={onSelectTrip}
              heldTrips={heldTrips}
            />
          );
        })}
    </div>
  );
}
