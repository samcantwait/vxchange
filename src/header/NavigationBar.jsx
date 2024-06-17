import "./NavigationBar.css";

export default function NavigationBar({ handleChangeView }) {
  return (
    <nav>
      <div onClick={() => handleChangeView("roster")}>1</div>
      <div onClick={() => handleChangeView("pool")}>2</div>
      <div onClick={() => handleChangeView("trade")}>3</div>
    </nav>
  );
}
