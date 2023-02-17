//this is just to make life easier
//the better but more time consuming way to do this is construct classes at runtime for runtime API requests
export interface Agent {
    "id": string,
    "agentName": string,
    "agentFirstName": string,
    "agentPhoneWork": string,
    "agentPhoneMobile": object,
    "agentEmail": string
}

export interface Group{    
    "id": string,
    "groupName": string,
    "groupWebsite": string,
    "groupType": string,
    "reservation": string,
    "insuranceSupplier": string,
    "roomCategories": Array<string>,
    "dateCreated": string,
    "groupSupplier": string,
    "groupCommissionPercentage": number
  }

  export interface Hotel {
    "id": string,
    "hotelName": string,
    "hotelAddress": string,
    "hotelPhone": string,
    "hotelImage": string,
    "hotelFrontDeskPhone": string,
    "hotelFrontDeskEmail": string,
    "hotelDescription": string,
    "hotelPositives": string,
    "hotelCodes": object,
    "preferredSuppler": string,
    "supplierCommissionList": string
}

export interface Payment{
    "paymentID": string,
    "paymentToken": string,
    "paymentAmount": string,
    "paymentType": string,
    "creditCardOwner": string,
    "paymentDate": string,
    "last4": string,
    "stripeReceipt": string
}

export interface Room {
    "id": string,
    "roomName": string,
    "travelDate": string,
    "travelStartDate": string,
    "travelEndDate": string,
    "travelNights": number,
    "totalPackageAmount": string,
    "totalPaidToTZ": string,
    "depositChecked": string,
    "balanceChecked": string,
    "remainingBalance": string,
    "supplier": string,
    "finalPaymentDue": string,
    "insuranceSupplier": string,
    "transferCompany": string,
    "destination": string,
    "roomType": string,
    "transferInfo": string,
    "agentId": string,
    "origin": string,
    "vacationType": string,
    "weddingDate2": string,
    "weddingDate": string,
    "daysTillTravel": number,
    "daysTillFinalPaymentDue": number,
    "roomStatus": string,
    "tzTransfer": string,
    "transferType": string,
    "tzPackage": string,
    "bookingNumber": string,
    "ptidPricingType": string
}

export interface Transfer{
    "transferCompanyName": object,
    "transferCompanyDescription": string,
    "transferImageLink": string,
    "transferImageDescription": string,
    "transferCompanyPhone": string,
    "transferCompanyEmail": string
}

export interface Traveler{
    "id": string,
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "phone": string,
    "email": string,
    "birthdate": string,
    "age": number,
    "amountPaid": string,
    "purchasedInsurance": string,
    "gender": string,
    "status": string
}

export interface RoomInfo{
    group: Array<Group>,
    room: Array<Room>,
    hotel: Array<Hotel>,
    travelers: Array<Traveler>,
    payments: Array<Payment>,
    transfer: Array<Transfer>,
    agent: Agent
}

//this is an example for data returned from an I/O request at runtime,
//as you can see is more time consuming to write, we use this to verify the types at runtime when desired, otherwise we represent 
//the data is the RoomInfoSanitized interface

export class RoomInfoRuntime{
    group: Group
    room: Room;
    hotel: Hotel
    travelers: Array<Traveler>;
    payments: Array<Payment>;
    transfer: Transfer;
    agent: Agent;
    
    constructor(roomInfo: RoomInfo){
        this.group = roomInfo.group[0];
        this.room = roomInfo.room[0];
        this.hotel = roomInfo.hotel[0];
        this.travelers = roomInfo.travelers;
        this.payments = roomInfo.payments;
        this.transfer = roomInfo.transfer[0];
        this.agent = roomInfo.agent;
    }
}

export interface RoomInfoSanitized{
    group: Group
    room: Room;
    hotel: Hotel
    travelers: Array<Traveler>;
    payments: Array<Payment>;
    transfer: Transfer;
    agent: Agent;
}
