/**
 *
 * @author
 *
 */
var Socket = (function () {
    function Socket() {
        var sock = new egret.WebSocket();
        sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket = sock;
    }
    var d = __define,c=Socket;p=c.prototype;
    p.connect = function (ip, port) {
        this._socket.connect(ip, port);
    };
    p.onSocketOpen = function () {
        var cmd = "Hello Egret WebSocket";
        console.log("发送数据：" + cmd);
        this._socket.writeUTF(cmd);
    };
    p.onReceiveMessage = function (e) {
        var msg = this._socket.readUTF();
        console.log("收到数据：" + msg);
    };
    p.send = function (msg) {
        console.log("连接成功，发送数据：" + msg);
        this._socket.writeUTF(msg);
    };
    return Socket;
})();
egret.registerClass(Socket,"Socket");
