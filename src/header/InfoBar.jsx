import { useTripScreen } from "../contexts/TripScreenContexts";
import "./InfoBar.css";

export default function InfoBar() {
  const { tfp } = useTripScreen();
  return (
    <div className="info-wrapper">
      <div className="placeholder">SA</div>
      <h2>Trip Pool</h2>
      <div className="tfp">{tfp}</div>
    </div>
  );
}
