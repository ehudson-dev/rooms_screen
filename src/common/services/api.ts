import { RoomInfo, RoomInfoSanitized, RoomInfoRuntime} from "../models";

const api_key = 'trsmthTaK7p/CS6CSQamg0zB9xxmd9w5COrtM9vS1azadc4sksMYPA==';

export interface RoomsResponse{
    roomInfo: Array<RoomInfo>
}
export interface RoomsDataForRedux{
    roomInfo: Array<RoomInfoSanitized>
}

export function GetRooms(roomIds: Array<string>): Promise<RoomsDataForRedux> {

    const requestOptions = {
        method: "GET",
        headers:{
            "x-functions-key": api_key,
            "accept": "application/json"
        }
    }

    return new Promise<RoomsDataForRedux>((resolve, reject) =>{

        let roomsDataForRedux : RoomsDataForRedux = {
            roomInfo: new Array<RoomInfoSanitized>
        } 

        fetch("https://destifyfunc-api-dev.azurewebsites.net/api/rooms?roomIds=" + roomIds.toString(), requestOptions)
            //access response metadata, in this case we just pull out the statuscode
            .then((response: Response) => {
                if(response.status !== 200)
                    reject();
                return response.json();
            })
            .then((data: RoomsResponse) => {
                data.roomInfo.forEach(roomInfo => {
                    //is this strictly necessary? no, just demonstrating the concept
                    const roomInfoRuntime = new RoomInfoRuntime(roomInfo);
                    const roomInfoForRedux : RoomInfoSanitized  = {
                        room: roomInfoRuntime.room,
                        group: roomInfoRuntime.group,
                        hotel: roomInfoRuntime.hotel,
                        travelers: roomInfoRuntime.travelers,
                        agent: roomInfoRuntime.agent,
                        payments: roomInfoRuntime.payments,
                        transfer: roomInfoRuntime.transfer
                    }
                    roomsDataForRedux.roomInfo.push(roomInfoForRedux);
                });
                resolve(roomsDataForRedux);
            });
    });

  }

