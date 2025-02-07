export class ControllerSocket{
    private isTransmitter: boolean = false;
    private isReciever: boolean = false;
    private hasIdentified: boolean = false;
    public socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }
    
    public IsTransmitter(): boolean{
        return this.isTransmitter;
    }

    IsReceiver(): boolean{
        return this.isReciever;
    }

    HasIdentified(): boolean{
        return this.hasIdentified;
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