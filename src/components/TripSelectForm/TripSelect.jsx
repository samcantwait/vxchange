import { useState } from "react";
import { useTrips } from "../../contexts/Trips/useTrips";

export default function TripSelect() {
  const { heldTrips, handleChangeTrip } = useTrips();
  const [option, setOption] = useState("select");
  const [crew, setCrew] = useState(null);

  return (
    <form>
      <select
        className="trip-options"
        name="trip-options"
        onChange={(e) => {
          setOption(e.target.value);
          setCrew(null);
        }}
      >
        <option value="select">Select Trip Option</option>
        {heldTrips.roster.length > 0 && !heldTrips.pool.length && (
          <>
            {" "}
            <option value="Drop">Drop</option>
            <option value="Direct Trade">Direct Trade</option>
            <option value="Advertise">Advertise</option>
            <option value="Un-Advertise">Un-Advertise</option>
          </>
        )}
        {heldTrips.roster.length > 0 && heldTrips.pool.length > 0 && (
          <option value="Swap">Swap</option>
        )}
        {heldTrips.pool.length && !heldTrips.roster.length && (
          <option value="Grab">Grab</option>
        )}
      </select>
      {option === "Direct Trade" && (
        <input
          type="text"
          placeholder="Enter crew"
          onChange={(e) => setCrew(e.target.value)}
          required
        />
      )}
      {option !== "select" && (
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (option === "Direct Trade" && crew === null)
              alert("Please enter crew employee number");
            handleChangeTrip(option, crew);
          }}
        >
          {option}
        </button>
      )}
    </form>
  );
}
