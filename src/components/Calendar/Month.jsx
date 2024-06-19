import { useEffect, useRef } from "react";
import Days from "./Days";

export default function Month({ curMonth }) {
  const scrollRef = useRef(null);
  const scrollToElement = () => {
    const { current } = scrollRef;
    if (current !== null) current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToElement, []);

  return (
    <table
      className="calendar-body"
      ref={curMonth.getMonth() === new Date().getMonth() ? scrollRef : null}
      style={{ scrollMarginTop: "20px" }}
    >
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
          {days.map((day) => {
            return (
              <th scope="col" className="weekday" key={crypto.randomUUID()}>
                <p>{day}</p>
              </th>
            );
          })}
        </tr>
        <Days curMonth={curMonth} />
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
