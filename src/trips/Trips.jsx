import Trip from "./Trip";

export default function Trips({
  allTrips,
  onSelectTrip,
  tripScreen,
  onChangeView,
  availTrips,
  onChangeTrip,
}) {
  return (
    <div className="trips-wrapper">
      {tripScreen === "roster" &&
        allTrips.map((trip) => {
          return (
            <Trip
              trip={trip}
              key={crypto.randomUUID()}
              selectTrip={onSelectTrip}
              changeTrip={onChangeTrip}
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
              changeTrip={onChangeTrip}
            />
          );
        })}
    </div>
  );
}
