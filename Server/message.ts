import { ControllerSocket } from "./ControllerSocket.ts";

export function handleIdentificationMessage(socket: ControllerSocket, message: string){
    if(message == "transmitter"){
        socket.SetTransmitter();
    } else if(message == "receiver"){
        socket.SetReciever();
    }else{
        socket.socket.send("Cannot understand Identification message")
        socket.socket.close();
    }
}