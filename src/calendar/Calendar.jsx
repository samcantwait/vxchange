import { useTrips } from "../contexts/useTrips";
import "./Calendar.css";
import Month from "./Month";

export default function Calendar() {
  const { rosterTrips } = useTrips();
  const curMonth = new Date();
  const prevMonth = new Date(
    curMonth.getFullYear(),
    curMonth.getMonth() - 1,
    1
  );
  const nextMonth = new Date(
    curMonth.getFullYear(),
    curMonth.getMonth() + 1,
    1
  );

  const tripDates = getTripDates(rosterTrips);

  return (
    <>
      <div className="calendar">
        <Month curMonth={prevMonth} tripDates={tripDates} />
        <Month curMonth={curMonth} tripDates={tripDates} />
        <Month curMonth={nextMonth} tripDates={tripDates} />
      </div>
    </>
  );
}

function getTripDates(trips) {
  const tripDates = Array(13);

  for (let i = 0; i < tripDates.length; i++) {
    tripDates[i] = Array(32);
  }

  trips.forEach((trip) => {
    const [month, day, year] = trip.startDate.split("-");
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const index = Number(month);
    for (let i = Number(day) + trip.length - 1; i >= Number(day); i--) {
      if (i > lastDayOfMonth) {
        if (tripDates[index + 1][i - lastDayOfMonth] === undefined) {
          tripDates[index + 1][i - lastDayOfMonth] = trip;
        } else
          tripDates[index + 1][i - lastDayOfMonth] = tripDates[index + 1][
            i - lastDayOfMonth
          ].nextTrip = trip;
      } else if (tripDates[index][i] === undefined) {
        tripDates[index][i] = trip;
      } else tripDates[index][i].nextTrip = trip;
    }
    const [endMonth, endDay] = trip.restEnd.endDate.split("-");
    tripDates[Number(endMonth)][Number(endDay)] = trip;
  });

  return tripDates;
}
