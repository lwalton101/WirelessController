import { ControllerSocket } from "./ControllerSocket.ts";

export function handler(_req: Request): Response {
    if (_req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
  
    const { socket , response } = Deno.upgradeWebSocket(_req) as {socket: ControllerSocket, response: Response};
    console.log(socket.IsTransmitter());
    socket.addEventListener("open", () => {
      console.log("a client connected!");
    });
  
    socket.addEventListener("message", (event) => {
        if(!socket.HasIdentified()){
            //handle identification
        }

        if(!socket.IsReceiver()){
            //handle reciever
        }

        if(!socket.IsTransmitter()){
            //handle transmitter
        }
    });
  
    return response;
  }