
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
    mobile: string;
}

export interface menuInfo {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    isVegeterian: boolean;
    image: string;
}

export interface orderItems {
    itemId: number;
    name: string;
    description: string;
    basePrice: number;
    isVegeterian: boolean;
    quantity: number;
}


export interface orderDetails {
    id: number;
    bookingDate: string;
    status: string;
    pnr: string;
    orderFrom: string;
    delivery: {
        trainName: string;
        trainNo: string;
        stationCode: string;
        stationName: string;
        coach: string;
        berth: string;
        deliveryDate: string;

    };
    payments: {
        paymentType: string;
        totalAmount: number;
        gst: number;
        deliveryCharge: number;
        payable_amount: number;

    };
    orderItems: {
        id: number;
        itemName: string;
        veg: boolean;
        description: string;
        basePrice: number;
        quantity: number;
    }[];
    outlet: {
        id: number;
        outletName: string;
        mobileNo: string;
        fssaiNo: string;
        city: string;
    };
    customer: {
        id: number;
        fullName: string;
        mobileNumber: string;
        emailId: string;

    };

}