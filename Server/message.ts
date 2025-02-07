import { ControllerSocket } from "./ControllerSocket.ts";
import { sockets } from "./websocket.ts";

export function handleIdentificationMessage(socket: ControllerSocket, message: string){
    if(message == "transmitter"){
        //A new transmitter has joined, we must tell receivers
        socket.SetTransmitter();
    } else if(message == "receiver"){
        //A new receiver has joined, we must tell them about all transmitters that exist
        socket.SetReciever();
    }else{
        socket.socket.send("Cannot understand Identification message")
        socket.socket.close();
        return;
    }
}

export function handleTransmitterMessage(socket: ControllerSocket, message: string){
    for(const clientSocket of sockets){
        if(!clientSocket.IsTransmitter()){
            continue;
        }
        clientSocket.socket.send(`${socket.GetID()};${message}`);
        
    }
}