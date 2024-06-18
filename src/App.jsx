import { TripScreenProvider } from "./contexts/TripScreen/TripScreenContext";
import Main from "./pages/main/Main";
import InfoBar from "./components/InfoBar/InfoBar";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <div className="content-wrapper">
      <TripScreenProvider>
        <header>
          <InfoBar />
          <NavigationBar />
        </header>
        <Main />
      </TripScreenProvider>
    </div>
  );
}

export default App;

// do I need the heldtrips to be prop drilled from app? Can they go in a component further down? actions can be taken on it within its component...
// tripScreen does need to be prop drilled

// is there a reason to make the trips from the 'database' a piece of state?
// can I just make a trip component with other components on it?
// then how do I update the roster and trip pool in state though?
