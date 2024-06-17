import InfoBar from "./InfoBar";
import NavigationBar from "./NavigationBar";

export default function Header({ tfp, onChangeView }) {
  return (
    <header>
      <InfoBar tfp={tfp} />
      <NavigationBar handleChangeView={onChangeView} />
    </header>
  );
}
