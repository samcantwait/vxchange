import Trip from "./Trip";

export default function Trips({ allTrips, onSelectTrip }) {
  return (
    <div className="trips-wrapper">
      {allTrips.map((trip) => {
        return (
          <Trip
            trip={trip}
            key={crypto.randomUUID()}
            selectTrip={onSelectTrip}
          />
        );
      })}
    </div>
  );
}
