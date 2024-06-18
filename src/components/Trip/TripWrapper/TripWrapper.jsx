import TripImage from "./TripImage/TripImage";
import TripInfo from "./TripInfo/TripInfo";

export default function TripWrapper({ trip }) {
  return (
    <div className="trip-wrapper">
      <TripImage trip={trip} />
      <TripInfo trip={trip} />
    </div>
  );
}
