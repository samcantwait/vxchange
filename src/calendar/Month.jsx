import { useState } from "react";
import CalendarDays from "./CalendarDays";

export default function Month({ curMonth, tripDates, selectTrip }) {
  return (
    <table className="calendar-body">
      <thead>
        <tr>
          <th colSpan={3} className="calendar-header">
            <h3>
              {months[curMonth.getMonth()]} {curMonth.getFullYear()}
            </h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-header">
          {days.map((day, index) => {
            return (
              <th scope="col" className="weekday" key={crypto.randomUUID()}>
                <p>{day}</p>
              </th>
            );
          })}
        </tr>
        <CalendarDays
          curMonth={curMonth}
          tripDates={tripDates}
          selectTrip={selectTrip}
        />
      </tbody>
    </table>
  );
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
