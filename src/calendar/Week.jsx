import { useTrips } from "../contexts/Trips/useTrips";

export default function Week({ week, curMonth }) {
  const { handleSelectCalendarTrip } = useTrips();

  //Look for nextTrip object within trip object and do stuff.
  return (
    <>
      {/* Fill each week with the individual days. */}
      {week.map((today) => {
        const curTrip = today.trip;
        const todayString = `${today.month}-${
          today.number < 10 ? `0${today.number}` : today.number
        }-${today.year}`;
        let flightPercentage,
          layoverStartPercentage,
          layoverEndPercentage,
          restStartPercentage,
          restEndPercentage,
          restPercentage;

        const startTrip =
          curTrip?.startDate === todayString ||
          curTrip?.nextTrip?.startDate === todayString;
        const endTrip = curTrip?.endDate === todayString;

        const tripMonth = +curTrip?.endDate.split("-")[0];
        const tripDay = +curTrip?.endDate.split("-")[1];
        const isTripEnded =
          (tripMonth === today.month && tripDay < today.number) ||
          (tripMonth < today.month && tripDay > today.number);

        const isNextTrip = curTrip?.nextTrip;

        const thisMonth = today.month === curMonth.getMonth() + 1;

        let startLayover = curTrip?.layovers.filter(
          (layover) => layover.startDate === todayString
        );

        if (!startLayover?.length && isNextTrip) {
          startLayover = curTrip?.nextTrip?.layovers.filter(
            (layover) => layover.startDate === todayString
          );
        }

        const endLayover = curTrip?.layovers.filter(
          (layover) => layover.endDate === todayString
        );
        const startRest = curTrip?.restEnd.startDate === todayString;
        const endRest = curTrip?.restEnd.endDate === todayString;

        function getPercentage(time) {
          const [hours, minutes] = time.split(":");
          return ((Number(hours) * 60 + Number(minutes)) / 1440) * 100;
        }

        if (curTrip && startTrip) {
          if (curTrip.nextTrip?.startDate === todayString) {
            flightPercentage = 100 - getPercentage(curTrip.nextTrip.report);
          } else flightPercentage = 100 - getPercentage(curTrip.report);
        } else if (curTrip && endTrip) {
          flightPercentage = getPercentage(curTrip.release);
        }

        if (curTrip && startLayover.length) {
          layoverStartPercentage =
            100 - getPercentage(startLayover[0].startTime);
        }
        if (curTrip && endLayover.length) {
          layoverEndPercentage = getPercentage(endLayover[0].endTime);
        }

        if (startRest && endRest) {
          restPercentage = 42;
        } else if (curTrip && startRest) {
          restStartPercentage = 100 - getPercentage(curTrip.restEnd.startTime);
        } else if (curTrip && endRest) {
          restEndPercentage = getPercentage(curTrip.restEnd.endTime);
        }

        return (
          <td
            className={`calendar-day ${
              today.currentMonth &&
              curMonth.getMonth() === new Date().getMonth()
                ? "current-month"
                : "not-current-month"
            } ${today.activeDay ? "current-day" : ""} ${
              curTrip?.nextTrip?.selected &&
              curTrip?.nextTrip?.startDate === todayString
                ? "selected"
                : ""
            } ${curTrip?.selected && !isTripEnded ? "selected" : ""} ${
              today.month !== curMonth.getMonth() + 1 ? "no-borders" : ""
            }`}
            id={`${curTrip?.selected && !isTripEnded ? "selected" : ""}`}
            key={crypto.randomUUID()}
            // dataset={`${today.month}-${today.number}`}
            onClick={() => {
              if (isTripEnded && curTrip?.nextTrip)
                return handleSelectCalendarTrip(curTrip.nextTrip);
              else if (curTrip) return handleSelectCalendarTrip(curTrip);
              else return;
            }}
          >
            <p>{thisMonth && today.number}</p>
            {curTrip && thisMonth && (!isTripEnded || isNextTrip) && (
              <div
                className={`calendar-event ${
                  startTrip
                    ? "calendar-event-start"
                    : endTrip
                    ? "calendar-event-end"
                    : ""
                }`}
                style={{
                  width: `${flightPercentage}%`,
                }}
              ></div>
            )}
            {layoverStartPercentage && thisMonth && (
              <div
                className="layover-event layover-event-start"
                style={{ width: `${layoverStartPercentage}%` }}
              >
                {startLayover.length &&
                  layoverStartPercentage >
                    getPercentage(startLayover[0].endTime) && (
                    <div
                      style={{
                        fontSize: "8px",
                        position: "absolute",
                        top: "-10px",
                        left: `${
                          layoverStartPercentage > 20
                            ? "-6px"
                            : layoverStartPercentage
                        }`,
                      }}
                    >
                      {startLayover[0].location}
                    </div>
                  )}
              </div>
            )}
            {layoverEndPercentage && thisMonth && (
              <div
                className="layover-event layover-event-end"
                style={{ width: `${layoverEndPercentage}%` }}
              >
                {endLayover.length &&
                  layoverEndPercentage >=
                    100 - getPercentage(endLayover[0].startTime) && (
                    <div
                      style={{
                        fontSize: "8px",
                        position: "absolute",
                        top: "-10px",
                      }}
                    >
                      {endLayover[0].location}
                    </div>
                  )}
              </div>
            )}
            {restPercentage && thisMonth && (
              <div
                className="rest-event rest-event-end"
                style={{
                  width: `${restPercentage}%`,
                  left: `${flightPercentage}%`,
                }}
              ></div>
            )}
            {restStartPercentage && thisMonth && (
              <div
                className="rest-event"
                style={{
                  width: `calc(${restStartPercentage}% + 2px)`,
                  left: `${flightPercentage}%`,
                  borderRight: "none",
                }}
              ></div>
            )}
            {restEndPercentage && thisMonth && (
              <div
                className="rest-event rest-event-end"
                style={{
                  width: `${restEndPercentage}%`,
                  left: 0,
                  borderLeft: "none",
                }}
              ></div>
            )}
          </td>
        );
      })}
    </>
  );
}
