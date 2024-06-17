
export interface userInfo {
    emailId: string;
    fullName: string;
    gender: string;
    id: number;
    jwt: string;
    mobileNumber: string;
}

export interface errorState {
    status: string;
    error: string | null;
    result: string | null;
}

export interface Station {
    code: string;
    name: string;
    arrival: string;
    departure: string;
    halt: string;
    depDate: string;
    delayArrival: string;
    serviceable: boolean;
    message: string | null;
}

export interface TrainInfo {
    trainNo: string;
    name: string;
    boarding: string;
    destination: string;
    dt: string;
}

export interface SeatInfo {
    coach: string;
    berth: string;
}


export interface pnrResponseResult {
    totalStation: number;
    stations: Station[];
    trainInfo: TrainInfo;
    seatInfo: SeatInfo;
    pnrNumber: number;

}

export interface profileInfo {
    fullName: string;
    mobileNumber: string;
    emailId: string;
    password: string;
    gender: string;
}

export interface outletInfo {
    id: number;
    outletName: string;
    minOrderValue: number;
    orderTiming: number;
    deliveryCost: number;
    prepaid: boolean;
    logoImage: string;
    tags: string;
    ratingValue: number;
    ratingCount: number;
    stationCode: string;
}
