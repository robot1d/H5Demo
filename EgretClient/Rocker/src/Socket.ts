/**
 *
 * @author 
 *
 */
class Socket {

    private _socket: egret.WebSocket;

    public constructor() {
        var sock: egret.WebSocket = new egret.WebSocket();
        sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

        this._socket = sock;
    }

    public connect(ip: string, port: number) {
        this._socket.connect(ip, port);
    }

    private onSocketOpen(): void {
        var cmd = "Hello Egret WebSocket";
        console.log("发送数据：" + cmd);
        this._socket.writeUTF(cmd);
    }

    private onReceiveMessage(e: egret.Event): void {
        var msg = this._socket.readUTF();
        console.log("收到数据：" + msg);
    }

    public send(msg: string) {
        console.log("连接成功，发送数据：" + msg);
        this._socket.writeUTF(msg);
    }
}
