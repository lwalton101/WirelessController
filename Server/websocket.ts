import { ControllerSocket } from "./ControllerSocket.ts";
import { handleIdentificationMessage, handleTransmitterMessage } from "./message.ts";

export const sockets: ControllerSocket[] = []

export function handler(_req: Request): Response {
    if (_req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
  
    const { socket , response } = Deno.upgradeWebSocket(_req);
    const controllerSocket = new ControllerSocket(socket);
    
    socket.addEventListener("open", () => {
        sockets.push(controllerSocket);
        console.log(`[${controllerSocket.GetID()}] Socket open`)
    });

    socket.addEventListener("close", () => {
        const index = sockets.findIndex((v => v == controllerSocket))
        sockets.splice(index, 1);
        console.log(sockets)
        console.log(`[${controllerSocket.GetID()}] Socket Closed`)

        if(controllerSocket.IsTransmitter()){
            for(const receiverSocket of sockets){
                if(receiverSocket.IsTransmitter()){
                    continue;
                }
                receiverSocket.socket.send(`1;${controllerSocket.GetID()}`);
            }
        }
    })
  
    socket.addEventListener("message", (event) => {
        if(!controllerSocket.HasIdentified()){
            handleIdentificationMessage(controllerSocket, event.data)
        }else if(!controllerSocket.IsReceiver()){
            //handle reciever
        }else if(!controllerSocket.IsTransmitter()){
            handleTransmitterMessage(controllerSocket, event.data)
            //handle transmitter
        }
    });
  
    return response;
  }
