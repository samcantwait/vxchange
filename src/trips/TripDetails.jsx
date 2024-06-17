export default function TripDetails({ trip }) {
  const [startMonth, startDay] = trip.startDate
    ? trip.startDate.split("-")
    : trip.departureDate.split("-");
  const [endMonth, endDay] = trip.endDate
    ? trip.endDate.split("-")
    : trip.arrivalDate.split("-");

  const checked = trip?.checked;

  return (
    <div className="trip-wrapper">
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

      <div className="trip-info">
        <div className="trip-dates">
          {months[startMonth - 1]} {startDay}
          {trip.report ? ` ${trip.report}` : ""} - {months[endMonth - 1]}{" "}
          {endDay} {trip.release}{" "}
          {trip.length ? `(${trip.length}d)` : trip.arrival}
        </div>
        <div className="details-wrapper">
          <div className="trip-id">
            <div className="trip-label">
              {trip.id
                ? "Trip"
                : trip.location
                ? trip.location
                : `VX ${trip.flightNo}`}
            </div>
            <div>
              {trip.id
                ? trip.id
                : trip.location
                ? `${trip.layoverLength}h`
                : `${trip.departureAirport} - ${trip.arrivalAirport}`}
            </div>
          </div>

          {trip.position && (
            <>
              <div className="trip-details">
                <div className="trip-label">POS</div>
                <div>{trip.position}</div>
              </div>
              <div className="trip-details">
                <div className="trip-label">Stn</div>
                <div>{trip.base}</div>
              </div>
              <div className="trip-details">
                <div className="trip-label">Layovers</div>
                <div className="layovers">
                  {trip.layovers?.map((layover) => (
                    <div key={crypto.randomUUID()}>
                      <div>{layover.location}</div>
                      <div className="layover-duration">
                        {layover.layoverLength}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {trip.blockTime && (
            <div className="trip-details">
              <div className="trip-label">Block</div>
              <div>{trip.blockTime}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
