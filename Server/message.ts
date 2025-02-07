import { ControllerSocket } from "./ControllerSocket.ts";
import { sockets } from "./websocket.ts";

export function handleIdentificationMessage(socket: ControllerSocket, message: string){
    if(message == "transmitter"){
        //A new transmitter has joined, we must tell receivers
        socket.SetTransmitter();
        for(const receiverSocket of sockets){
            if(receiverSocket.IsTransmitter()){
                continue;
            }
            receiverSocket.socket.send(`0;${socket.GetID()}`);
        }
        console.log(`[${socket.GetID()}] Transmitter socket registered`)
    } else if(message == "receiver"){
        //A new receiver has joined, we must tell them about all transmitters that exist
        socket.SetReciever();

        for(const transmitterSocket of sockets){
            if(transmitterSocket.IsReceiver()){
                continue;
            }
            socket.socket.send(`0;${transmitterSocket.GetID()}`);
        }

        console.log(`[${socket.GetID()}] Receiver socket registered`)
    }else{
        console.log(`[${socket.GetID()}] Socket sent unknown identification`)
        socket.socket.send("Cannot understand Identification message")
        socket.socket.close();
        return;
    }
}

export function handleTransmitterMessage(socket: ControllerSocket, message: string){
    //Forward any message from a transmitter to a receiver
    for(const clientSocket of sockets){
        if(clientSocket == socket){
            continue;
        }
        if(clientSocket.IsTransmitter()){
            continue;
        }
        console.log(`[${socket.GetID()}] Forwarding message to ${clientSocket.GetID()}`)
        clientSocket.socket.send(`${socket.GetID()};${message}`);
    }
}