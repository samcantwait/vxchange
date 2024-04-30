import Trip from "./Trip";

export default function Trips({ allTrips, onSelectTrip, tripScreen }) {
  return (
    <div className="trips-wrapper">
      {tripScreen === "roster" &&
        allTrips.rosterTrips.map((trip) => {
          return (
            <Trip
              trip={trip}
              key={crypto.randomUUID()}
              selectTrip={onSelectTrip}
              heldTrips={allTrips.heldTrips}
            />
          );
        })}
      {tripScreen === "pool" &&
        allTrips.availTrips.map((trip) => {
          return (
            <Trip
              trip={trip}
              key={crypto.randomUUID()}
              selectTrip={onSelectTrip}
              heldTrips={allTrips.heldTrips}
            />
          );
        })}
    </div>
  );
}
