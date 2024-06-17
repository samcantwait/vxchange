import { createContext, useContext, useState } from "react";
import { assignedTrips } from "../trips";
import { tripPool } from "../tripPool";
import { useTripScreen } from "./TripScreenContexts";

const monthNow = new Date().getMonth() + 1;

const TripsContext = createContext();

function TripsProvider({ children }) {
  const { tripScreen } = useTripScreen();

  const [rosterTrips, setRosterTrips] = useState(assignedTrips);
  const [availTrips, setAvailTrips] = useState(tripPool);

  function handleSelectTrip(e, trip) {
    console.log(e);

    const isSelected = trip?.selected === true;
    if (tripScreen === "pool") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setHeldTrips((t) => {
          if (heldTrips.pool.indexOf(trip) !== 1) {
            const filtered = t.pool.filter((s) => s.id !== trip.id);
            return { ...t, pool: [...filtered] };
          } else {
            return { ...t, pool: [...t.pool, trip] };
          }
        });
      } else {
        setAvailTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      }
    } else if (tripScreen === "roster") {
      if (
        e.target.classList.contains("trip-image") ||
        e.target.classList.contains("trip-select")
      ) {
        setHeldTrips((t) => {
          if (heldTrips.roster.indexOf(trip) !== -1) {
            const filtered = t.roster.filter((s) => s.id !== trip.id);
            return { ...t, roster: [...filtered] };
          } else
            return {
              ...t,
              roster: [...t.roster, trip],
            };
        });
      } else {
        setRosterTrips((t) =>
          t.map((i) =>
            i.id === trip?.id
              ? { ...i, selected: !isSelected }
              : { ...i, selected: false }
          )
        );
      }
    } else {
      // make trips selected
      // setHeldTrips((t) => {
      //   t.map((i) => {
      //     return i.id === trip?.id
      //       ? { ...i, selected: !isSelected }
      //       : { ...i, selected: false };
      //   });
      // });
    }
  }

  const [heldTrips, setHeldTrips] = useState({
    roster: [
      {
        id: 45177,
        startDate: `${monthNow}-01-2024`,
        endDate: `${monthNow}-01-2024`,
        report: "09:15",
        release: "16:09",
        length: 1,
        creditTFP: 7,
        blockFAR: "06:29",
        TAFB: "08:51",
        totalDuty: "08:51",
        flights: [
          {
            flightNo: 843,
            departureAirport: "SFO",
            arrivalAirport: "SJD",
            departureDate: `${monthNow}-01-2024`,
            arrivalDate: `${monthNow}-01-2024`,
            departure: "08:15",
            arrival: "11:24",
            blockTime: "03:09",
          },
          {
            flightNo: 379,
            departureAirport: "SJD",
            arrivalAirport: "SFO",
            departureDate: `${monthNow}-01-2024`,
            arrivalDate: `${monthNow}-01-2024`,
            departure: "12:34",
            arrival: "15:54",
            blockTime: "03:20",
          },
        ],
        layovers: [],
        restEnd: {
          startDate: `${monthNow}-01-2024`,
          endDate: `${monthNow}-01-2024`,
          startTime: "16:09",
          endTime: "00:09",
        },
        selected: false,
        position: "FA",
        base: "SFO",
      },
    ],
    pool: [
      {
        id: 45178,
        startDate: `${monthNow}-02-2024`,
        endDate: `${monthNow}-02-2024`,
        report: "18:24",
        release: "23:55",
        length: 1,
        creditTFP: 5,
        blockFAR: "03:21",
        TAFB: "05:31",
        totalDuty: "05:31",
        flights: [
          {
            flightNo: 438,
            departureAirport: "SFO",
            arrivalAirport: "LAS",
            departureDate: `${monthNow}-02-2024`,
            arrivalDate: `${monthNow}-02-2024`,
            departure: "19:24",
            arrival: "21:04",
            blockTime: "01:40",
          },
          {
            flightNo: 413,
            departureAirport: "LAS",
            arrivalAirport: "SFO",
            departureDate: `${monthNow}-02-2024`,
            arrivalDate: `${monthNow}-02-2024`,
            departure: "21:59",
            arrival: "23:40",
            blockTime: "01:41",
          },
        ],
        layovers: [],
        restEnd: {
          startDate: `${monthNow}-02-2024`,
          endDate: `${monthNow}-03-2024`,
          startTime: "23:55",
          endTime: "07:55",
        },
        selected: false,
        position: "FD",
        base: "SFO",
      },
    ],
  });

  // function handleHoldTrip() {
  //   // do something with the trip and also call the onSelectTrip function
  // }

  return (
    <TripsContext.Provider
      value={{ rosterTrips, handleSelectTrip, heldTrips, availTrips }}
    >
      {children}
    </TripsContext.Provider>
  );
}

function useTrips() {
  const context = useContext(TripsContext);
  if (context === undefined)
    throw new Error("TripContext was used outside of TripProvider");
  return context;
}

export { TripsProvider, useTrips };
