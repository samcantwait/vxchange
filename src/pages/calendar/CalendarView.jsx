import "./Calendar.css";
import Month from "../../components/Calendar/Month";

const curMonth = new Date();
const prevMonth = new Date(curMonth.getFullYear(), curMonth.getMonth() - 1, 1);
const nextMonth = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 1);

export default function Calendar() {
  return (
    <>
      <div className="calendar">
        <Month curMonth={prevMonth} />
        <Month curMonth={curMonth} />
        <Month curMonth={nextMonth} />
      </div>
    </>
  );
}
