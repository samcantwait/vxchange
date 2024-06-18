export default function TripBar({ trip }) {
  return (
    <div className="trip-bar">
      <span>CR/TFP {trip.creditTFP}</span>
      <span>FAR block time {trip.blockFAR}h</span>
    </div>
  );
}
