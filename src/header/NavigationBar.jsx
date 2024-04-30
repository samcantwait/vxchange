import "./NavigationBar.css";

export default function NavigationBar({ onChangeView, allTrips }) {
  return (
    <nav>
      <div onClick={() => onChangeView("roster")}>1</div>
      <div onClick={() => onChangeView("pool")}>2</div>
      <div>3</div>
    </nav>
  );
}
