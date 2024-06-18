import { createContext, useState } from "react";

const TripScreenContext = createContext();

function TripScreenProvider({ children }) {
  const [tripScreen, setTripScreen] = useState("roster");
  const [tfp, setTfp] = useState(73.2);

  function handleChangeView(view) {
    setTripScreen(view);
  }

  function handleChangeTfp(tfp) {
    setTfp(tfp);
  }

  return (
    <TripScreenContext.Provider
      value={{ tripScreen, handleChangeView, tfp, handleChangeTfp }}
    >
      {children}
    </TripScreenContext.Provider>
  );
}

export { TripScreenProvider, TripScreenContext };
