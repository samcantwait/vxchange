import Calendar from "../calendar/Calendar";

import { TripsProvider } from "../contexts/TripsContext";
import Trips from "./Trips";

export default function Main() {
  return (
    <main className="main-content">
      <TripsProvider>
        <div className="aside-wrapper">
          <div className="aside">
            <Calendar />
          </div>
        </div>
        <Trips />
      </TripsProvider>
    </main>
  );
}
