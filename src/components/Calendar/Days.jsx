import { useTrips } from "../../contexts/Trips/useTrips";
import { Week } from "./Week";

export default function Days({ curMonth }) {
  const { rosterTrips } = useTrips();

  const tripDates = getTripDates(rosterTrips);
  const rows = getRows(curMonth, tripDates);

  return (
    <>
      {/* Map each week into a new row on the table. */}
      {rows.map((week) => {
        return (
          <tr key={crypto.randomUUID()}>
            <Week week={week} key={crypto.randomUUID()} curMonth={curMonth} />
          </tr>
        );
      })}
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

function getRows(curMonth, tripDates) {
  let firstDayOfMonth = new Date(
    curMonth.getFullYear(),
    curMonth.getMonth(),
    1
  );
  const currentDays = [];
  let counter = 0;

  let day = firstDayOfMonth.getDay() === 0 ? 0 : -firstDayOfMonth.getDay() + 1;

  const curDaysInMonth = new Date(
    curMonth.getFullYear(),
    curMonth.getMonth() + 1,
    0
  ).getDate();

  const lastDay =
    7 - new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0).getDay();
  const today = new Date();

  // check day and lastday
  let workingMonth;

  for (day; day < curDaysInMonth + lastDay; day++) {
    workingMonth = new Date(curMonth.getFullYear(), curMonth.getMonth(), day);

    const month = workingMonth.getMonth() + 1;
    const number = workingMonth.getDate();

    // Create a calendar day object to store information about each day and help for styling.
    let calendarDay = {
      currentMonth: workingMonth.getMonth() === today.getMonth(), //true,false
      date: new Date(workingMonth), // Ex. Mon Apr 29 2024 00:00:00 GMT-0500 (Central Daylight Time)
      month: month, // 2
      number: number, // If today is the 12th, returns 12
      activeDay: workingMonth.toDateString() === today.toDateString(), // false
      year: workingMonth.getFullYear(), //2024
      trip: tripDates[+month][+number],
    };
    if (counter > 0) counter--;
    if (calendarDay.trip) counter = calendarDay.trip.tripLength - 2;
    // Add each day to the array so it may be looped through later.
    currentDays.push(calendarDay);
  }

  const rows = [];
  // Create a new array that may be mutated.
  const allDays = [...currentDays];

  // Create a new array of arrays containing 7 days each to be the weeks.
  while (allDays.length) {
    const daysToPush = allDays.splice(0, 7);
    rows.push(daysToPush);
  }

  return rows;
}
