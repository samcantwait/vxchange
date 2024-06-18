import TripBar from "./TripBar/TripBar";
import { useTrips } from "../../contexts/Trips/useTrips";
import "./Trip.css";
import TripWrapper from "./TripWrapper/TripWrapper";

// Create an indexed array to hold the trips
function createTripArr(trip) {
  const tripArr = Array(13);
  for (let i = 0; i < tripArr.length; i++) {
    tripArr[i] = Array(32);
  }

  // The following functions turn the flight and layover arrays into a single array where each index represents a calendar day.
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
  return tripArr.flat().flat();
}

export default function Trip({ trip }) {
  const { handleSelectTrip } = useTrips();
  const flatArr = createTripArr(trip);

  return (
    <div
      className={trip.selected ? "trip trip-selected" : "trip"}
      onClick={(e) => handleSelectTrip(e, trip)}
    >
      <TripWrapper trip={trip} />
      <TripBar trip={trip} />
      {trip.selected && (
        <div className="trip-expanded" key={crypto.randomUUID()}>
          {flatArr.map((flight) => (
            <div className="flights" key={crypto.randomUUID()}>
              <TripWrapper trip={flight} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
