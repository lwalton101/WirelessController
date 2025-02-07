import * as uuid from "jsr:@std/uuid";

export class ControllerSocket{
    private isTransmitter: boolean = false;
    private isReciever: boolean = false;
    private hasIdentified: boolean = false;
    private id: string;
    public socket: WebSocket;
    
    constructor(socket: WebSocket) {
        this.socket = socket;
        this.id = uuid.v1.generate().substring(0,8);
    }
    
    IsTransmitter(): boolean{
        return this.isTransmitter;
    }

    IsReceiver(): boolean{
        return this.isReciever;
    }

    HasIdentified(): boolean{
        return this.hasIdentified;
    }

    GetID():string{
        return this.id;
    }

    SetTransmitter(){
        if(this.hasIdentified){
            return;
        }

        this.hasIdentified = true;
        this.isTransmitter = true;
    }

    SetReciever(){
        if(this.hasIdentified){
            return;
        }

        this.hasIdentified = true;
        this.isReciever = true;
    }


}