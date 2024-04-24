const monthNow = new Date().getMonth() + 1;

const trips = [
  {
    id: 45177,
    startDate: `${monthNow}-01-2024`,
    endDate: `${monthNow}-01-2024`,
    report: "07:15",
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
  {
    id: 45109,
    startDate: `${monthNow}-07-2024`,
    endDate: `${monthNow}-08-2024`,
    report: "06:40",
    release: "10:43",
    length: 2,
    creditTFP: 10,
    blockFAR: "08:33",
    TAFB: "28:03",
    totalDuty: "12:28",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "SAN",
        departureDate: `${monthNow}-07-2024`,
        arrivalDate: `${monthNow}-07-2024`,
        departure: "07:40",
        arrival: "09:17",
        blockTime: "01:37",
      },
      {
        flightNo: 12345,
        departureAirport: "SAN",
        arrivalAirport: "AUS",
        departureDate: `${monthNow}-07-2024`,
        arrivalDate: `${monthNow}-07-2024`,
        departure: "10:57",
        arrival: "15:55",
        blockTime: "02:58",
      },
      {
        flightNo: 12345,
        departureAirport: "AUS",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-08-2024`,
        arrivalDate: `${monthNow}-08-2024`,
        departure: "08:30",
        arrival: "10:28",
        blockTime: "03:58",
      },
    ],
    layovers: [
      {
        location: "AUS",
        startDate: `${monthNow}-07-2024`,
        startTime: "16:10",
        endDate: `${monthNow}-08-2024`,
        endTime: "07:45",
        layoverLength: "15:35",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-08-2024`,
      endDate: `${monthNow}-08-2024`,
      startTime: "10:43",
      endTime: "20:43",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45032,
    startDate: `${monthNow}-09-2024`,
    endDate: `${monthNow}-10-2024`,
    report: "06:00",
    release: "10:12",
    length: 2,
    creditTFP: 12.8,
    blockFAR: "11:09",
    TAFB: "28:12",
    totalDuty: "13:24",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "IAD",
        departureDate: `${monthNow}-09-2024`,
        arrivalDate: `${monthNow}-09-2024`,
        departure: "07:00",
        arrival: "15:12",
        blockTime: "05:12",
      },
      {
        flightNo: 12345,
        departureAirport: "IAD",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-10-2024`,
        arrivalDate: `${monthNow}-10-2024`,
        departure: "07:00",
        arrival: "09:57",
        blockTime: "05:57",
      },
    ],
    layovers: [
      {
        location: "IAD",
        startDate: `${monthNow}-09-2024`,
        startTime: "15:27",
        endDate: `${monthNow}-10-2024`,
        endTime: "06:15",
        layoverLength: "14:48",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-10-2024`,
      endDate: `${monthNow}-10-2024`,
      startTime: "10:12",
      endTime: "18:12",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45127,
    startDate: `${monthNow}-11-2024`,
    endDate: `${monthNow}-12-2024`,
    report: "7:00",
    release: "20:36",
    length: 2,
    creditTFP: 13,
    blockFAR: "11:21",
    TAFB: "37:36",
    totalDuty: "13:36",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "DCA",
        departureDate: `${monthNow}-11-2024`,
        arrivalDate: `${monthNow}-11-2024`,
        departure: "08:00",
        arrival: "16:17",
        blockTime: "05:17",
      },
      {
        flightNo: 12345,
        departureAirport: "DCA",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-12-2024`,
        arrivalDate: `${monthNow}-12-2024`,
        departure: "17:17",
        arrival: "20:21",
        blockTime: "06:04",
      },
    ],
    layovers: [
      {
        location: "DCA",
        startDate: `${monthNow}-11-2024`,
        startTime: "16:32",
        endDate: `${monthNow}-12-2024`,
        endTime: "16:32",
        layoverLength: "24:00",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-12-2024`,
      endDate: `${monthNow}-13-2024`,
      startTime: "20:36",
      endTime: "06:36",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45184,
    startDate: `${monthNow}-22-2024`,
    endDate: `${monthNow}-23-2024`,
    report: "07:40",
    release: "21:15",
    length: 2,
    creditTFP: 13.6,
    blockFAR: "12:08",
    TAFB: "37:35",
    totalDuty: "14:23",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "EWR",
        departureDate: `${monthNow}-22-2024`,
        arrivalDate: `${monthNow}-22-2024`,
        departure: "08:40",
        arrival: "17:23",
        blockTime: "05:43",
      },
      {
        flightNo: 12345,
        departureAirport: "EWR",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-23-2024`,
        arrivalDate: `${monthNow}-23-2024`,
        departure: "17:35",
        arrival: "21:00",
        blockTime: "06:25",
      },
    ],
    layovers: [
      {
        location: "EWR",
        startDate: `${monthNow}-22-2024`,
        startTime: "17:38",
        endDate: `${monthNow}-23-2024`,
        endTime: "16:50",
        layoverLength: "23:12",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-23-2024`,
      endDate: `${monthNow}-24-2024`,
      startTime: "21:15",
      endTime: "07:36",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45270,
    startDate: `${monthNow}-24-2024`,
    endDate: `${monthNow}-25-2024`,
    report: "12:50",
    release: "18:47",
    length: 2,
    creditTFP: 10.8,
    blockFAR: "09:22",
    TAFB: "29:57",
    totalDuty: "11:37",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "ANC",
        departureDate: `${monthNow}-24-2024`,
        arrivalDate: `${monthNow}-24-2024`,
        departure: "13:50",
        arrival: "17:35",
        blockTime: "04:45",
      },
      {
        flightNo: 12345,
        departureAirport: "ANC",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-25-2024`,
        arrivalDate: `${monthNow}-25-2024`,
        departure: "12:55",
        arrival: "18:32",
        blockTime: "04:37",
      },
    ],
    layovers: [
      {
        location: "ANC",
        startDate: `${monthNow}-24-2024`,
        startTime: "17:50",
        endDate: `${monthNow}-25-2024`,
        endTime: "12:10",
        layoverLength: "18:20",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-25-2024`,
      endDate: `${monthNow}-26-2024`,
      startTime: "18:47",
      endTime: "04:47",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45134,
    startDate: `${monthNow}-26-2024`,
    endDate: `${monthNow}-27-2024`,
    report: "07:00",
    release: "20:29",
    length: 2,
    creditTFP: 13,
    blockFAR: "11:14",
    TAFB: "37:29",
    totalDuty: "13:29",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "DCA",
        departureDate: `${monthNow}-26-2024`,
        arrivalDate: `${monthNow}-26-2024`,
        departure: "08:00",
        arrival: "16:14",
        blockTime: "05:14",
      },
      {
        flightNo: 12345,
        departureAirport: "DCA",
        arrivalAirport: "SFO",
        departureDate: `${monthNow}-27-2024`,
        arrivalDate: `${monthNow}-27-2024`,
        departure: "17:14",
        arrival: "20:14",
        blockTime: "06:00",
      },
    ],
    layovers: [
      {
        location: "DCA",
        startDate: `${monthNow}-26-2024`,
        startTime: "16:29",
        endDate: `${monthNow}-27-2024`,
        endTime: "16:29",
        layoverLength: "24:00",
      },
    ],
    restEnd: {
      startDate: `${monthNow}-27-2024`,
      endDate: `${monthNow}-28-2024`,
      startTime: "20:29",
      endTime: "06:29",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
  {
    id: 45023,
    startDate: `${monthNow}-30-2024`,
    endDate: `${monthNow + 1}-01-2024`,
    report: "06:00",
    release: "16:41",
    length: 2,
    creditTFP: 13.8,
    blockFAR: "12:13",
    TAFB: "32:16",
    totalDuty: "34:41",
    flights: [
      {
        flightNo: 12345,
        departureAirport: "SFO",
        arrivalAirport: "JFK",
        departureDate: `${monthNow}-30-2024`,
        arrivalDate: `${monthNow}-30-2024`,
        departure: "07:00",
        arrival: "15:45",
        blockTime: "05:45",
      },
      {
        flightNo: 12345,
        departureAirport: "JFK",
        arrivalAirport: "SFO",
        departureDate: `${monthNow + 1}-01-2024`,
        arrivalDate: `${monthNow + 1}-01-2024`,
        departure: "13:00",
        arrival: "16:28",
        blockTime: "06:28",
      },
    ],
    layovers: [
      {
        location: "JFK",
        startDate: `${monthNow}-30-2024`,
        startTime: "16:00",
        endDate: `${monthNow + 1}-01-2024`,
        endTime: "12:15",
        layoverLength: "20:15",
      },
    ],
    restEnd: {
      startDate: `${monthNow + 1}-01-2024`,
      endDate: `${monthNow + 1}-02-2024`,
      startTime: "16:43",
      endTime: "02:43",
    },
    selected: false,
    position: "FB",
    base: "SFO",
  },
];

export { trips };
