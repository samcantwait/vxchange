export default function TripImage({ trip }) {
  const checked = trip?.checked;

  return (
    <div className="select-wrapper">
      <div className={trip.location ? "trip-select layover" : "trip-select"}>
        {trip.id && !checked ? (
          <img src="../trip.svg" className="trip-image"></img>
        ) : trip.id && checked ? (
          <img src="../check.svg" className="trip-image"></img>
        ) : null}
        {trip.location && (
          <img src="../layover.svg" className="trip-image"></img>
        )}
        {trip.flightNo && (
          <img src="../flight.svg" className="trip-image"></img>
        )}
      </div>
    </div>
  );
}
