import "./Trip.css";
import TripDetails from "./TripDetails";

export default function Trip({ trip, selectTrip, heldTrips }) {
  const tripArr = Array(13);
  for (let i = 0; i < tripArr.length; i++) {
    tripArr[i] = Array(32);
  }

  trip.flights.forEach((flight) => {
    const [index, day] = flight.departureDate.split("-");
    tripArr[+index][+day] =
      tripArr[+index][+day] !== undefined
        ? [...tripArr[+index][+day], flight]
        : [flight];
  });
  trip.layovers.forEach((layover) => {
    const [index, day] = layover.startDate.split("-");
    tripArr[+index][+day] =
      tripArr[+index][+day] !== undefined
        ? [...tripArr[+index][+day], layover]
        : [layover];
  });
  const flatArr = tripArr.flat().flat();

  return (
    <div
      className={trip.selected ? "trip trip-selected" : "trip"}
      onClick={(e) => selectTrip(e, trip)}
    >
      <TripDetails
        trip={trip}
        key={crypto.randomUUID()}
        heldTrips={heldTrips}
      />
      <div className="trip-bar">
        <span>CR/TFP {trip.creditTFP}</span>
        <span>FAR block time {trip.blockFAR}h</span>
      </div>
      {trip.selected && (
        <div className="trip-expanded" key={crypto.randomUUID()}>
          {flatArr.map((flight) => (
            <div className="flights" key={crypto.randomUUID()}>
              <TripDetails trip={flight} heldTrips={heldTrips} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
