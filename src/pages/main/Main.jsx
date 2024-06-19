import { TripsProvider } from "../../contexts/Trips/TripsContext";
import Calendar from "../calendar/CalendarView";
import Trips from "../trips/Trips";

export default function Main() {
  return (
    <main className="main-content">
      <TripsProvider>
        <aside className="aside-wrapper">
          <div className="aside">
            <Calendar />
          </div>
        </aside>
        <Trips />
      </TripsProvider>
    </main>
  );
}
