
export interface userInfo {
    createdAt: string;
    emailId: string;
    fullName: string;
    gender: string;
    id: number;
    jwt: string;
    lastLogin: string;
    mobileNumber: string;
    password: string;
    role: string;
    updatedAt: string;
}

export interface errorState {
    status: string;
    error: string | null;
    result: null;
}

export interface Station {
    code: string;
    name: string;
    isCateringAvailable: boolean;
    dayCount: string;
    arrival: string;
    departure: string;
    halt: string;
    stationSerialNumber: null;
    routeNumber: null;
    arrDate: string;
    depDate: string;
    delayArrival: string;
    schArrivalTime: string;
    schArrivalDate: string;
}

export interface TrainInfo {
    trainNo: string;
    name: string;
    boarding: string;
    destination: string;
    dt: string;
    boardingDayCount: null;
    fromStationName: null;
    toStationName: null;
    origin: null;
}

export interface SeatInfo {
    coach: string;
    berth: string;
    noOfSeats: number;
}

export interface PassengerInfo {
    currentCoach: string;
    currentBerthNo: string;
}

export interface pnrResponseResult {
    stations: Station[];
    trainInfo: TrainInfo;
    seatInfo: SeatInfo;
    passengerInfo: PassengerInfo[];

}

export interface profileInfo {
    fullName: string;
    mobileNumber: string;
    emailId: string;
    password: string;
    gender: string;
}
