import { useState } from "react";

export default function TripDetails({ trip, changeTrip }) {
  const [checked, setChecked] = useState(false);
  const [startMonth, startDay] = trip.startDate
    ? trip.startDate.split("-")
    : trip.departureDate.split("-");
  const [endMonth, endDay] = trip.endDate
    ? trip.endDate.split("-")
    : trip.arrivalDate.split("-");

  function handleClick(e) {
    if (trip.id) {
      console.log(e);
      e.stopPropagation();
      setChecked((c) => !c);

      changeTrip(trip);
    }
  }

  return (
    <div
      className={
        trip.flightNo || trip.location
          ? "trip-wrapper expanded"
          : "trip-wrapper"
      }
    >
      <div className="select-wrapper">
        <div
          className={trip.location ? "trip-select layover" : "trip-select"}
          onClick={(e) => handleClick(e)}
        >
          {trip.id && !checked ? (
            <img src="../public/trip.svg" className="trip-image"></img>
          ) : trip.id && checked ? (
            <img src="../public/check.svg" className="trip-image"></img>
          ) : null}
          {trip.location && (
            <img src="../public/layover.svg" className="trip-image"></img>
          )}
          {trip.flightNo && (
            <img src="../public/flight.svg" className="trip-image"></img>
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
                  {trip.layovers?.map((layover, index) => (
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
