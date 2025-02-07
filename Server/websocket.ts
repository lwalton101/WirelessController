import { ControllerSocket } from "./ControllerSocket.ts";
import { handleIdentificationMessage } from "./message.ts";

const sockets: ControllerSocket[] = []

export function handler(_req: Request): Response {
    if (_req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
  
    const { socket , response } = Deno.upgradeWebSocket(_req);
    const controllerSocket = new ControllerSocket(socket);
    console.log(controllerSocket.IsTransmitter());
    socket.addEventListener("open", () => {
      console.log("a client connected!");
    });

    socket.addEventListener("close", (ev) => {
        const index = sockets.findIndex((v => v == controllerSocket))
        sockets.splice(index, 1);
        console.log(sockets)
    })
  
    socket.addEventListener("message", (event) => {
        sockets.push(controllerSocket);
        console.log(sockets)

        if(!controllerSocket.HasIdentified()){
            handleIdentificationMessage(controllerSocket, event.data)
        }

        if(!controllerSocket.IsReceiver()){
            //handle reciever
        }

        if(!controllerSocket.IsTransmitter()){
            for(const clientSocket of sockets){
                if(!clientSocket.IsReceiver()){
                    continue;
                }
                clientSocket.socket.send(`${event.data}`)
                
            }
            //handle transmitter
        }
    });
  
    return response;
  }