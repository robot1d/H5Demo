using SuperSocket.SocketBase;
using SuperWebSocket;
using System;
using System.Drawing;
using System.Text.RegularExpressions;
using ThoughtWorks.QRCode.Codec;

namespace LibraServer.webSocketServer
{
    class Server
    {

        //定义一个delegate委托
        public delegate void LogHandler(string log);

        //定义事件，类型为上面定义的ClickHandler委托
        public event LogHandler OnLog;

        /// <summary>
        /// SuperWebSocket中的WebSocketServer对象
        /// </summary>
        private WebSocketServer ws = null;

        private string ip = "";

        private int port = 0;

        private int upPressed = 0;

        private int upReleased = 0;

        private int downPressed = 0;

        private int downReleased = 0;

        public Server()
        {
            ws = new WebSocketServer();//实例化WebSocketServer

            //添加事件侦听
            //有新会话握手并连接成功
            ws.NewSessionConnected += OnNewSessionConnected;
            //有会话被关闭 可能是服务端关闭 也可能是客户端关闭
            ws.SessionClosed += OnSessionClosed;
            //有客户端发送新的消息
            ws.NewMessageReceived += OnNewMessageReceived;
        }

        public bool Start(string ip, int port)
        {
            if (IsIP(ip))
            {
                if (ws.State == ServerState.NotInitialized)
                {
                    if (!ws.Setup(ip, port))
                    {
                        OnLog("WebSocket 设置WebSocket服务侦听地址失败");
                        return false;
                    }
                }
                if (ws.State == ServerState.NotStarted)
                {
                    if (ws.Start())
                    {
                        this.ip = ip;
                        this.port = port;
                        OnLog("WebSocket 启动服务成功");
                        return true;
                    }
                    else
                    {
                        OnLog("启动WebSocket服务侦听失败");
                    }
                }
            }
            else
            {
                Console.WriteLine("IP格式不对", ip);
            }
            return false;
        }

        public bool Stop()
        {
            if (ws.State == ServerState.Running)
            {
                ws.Stop();
                OnLog("WebSocket 关闭服务成功");
                return true;
            }
            return false;
        }

        private void OnNewMessageReceived(WebSocketSession session, string value)
        {
            //var msg = string.Format("{0} {1}发送消息: {2}", DateTime.Now.ToLocalTime(), GetSessionName(session), value);
            //OnLog(msg);
            //SendToAll(session, msg);
            switch (value)
            {
                case "upPressed":
                    upPressed++;
                    break;
                case "upReleased":
                    upReleased++;
                    break;
                case "downPressed":
                    downPressed++; 
                    break;
                case "downReleased":
                    downReleased++;
                    break;
                case "back":
                    OnLog(string.Format("upPessed = {0}, upReleased = {1}, downPressed = {2}, downReleased = {3}", upPressed, upReleased, downPressed, downReleased));
                    break;
            }
        }

        private void OnSessionClosed(WebSocketSession session, CloseReason value)
        {
            var msg = string.Format("{0:HH:MM:ss}  与客户端:{1}的会话被关闭 原因：{2}", DateTime.Now, GetSessionName(session), value);
            OnLog(msg);
            SendToAll(session, msg);
        }

        private void OnNewSessionConnected(WebSocketSession session)
        {
            var msg = string.Format("{0:HH:MM:ss}  与客户端:{1}创建新会话", DateTime.Now, GetSessionName(session));
            OnLog(msg);
            SendToAll(session, msg);
        }

        private string GetSessionName(WebSocketSession session)
        {
            //这里用Path来取Name 不太科学…… 
            //return HttpUtility.UrlDecode(session.Path.TrimStart('/'));
            return "sss";
        }

        private void SendToAll(WebSocketSession session, string msg)
        {
            //广播
            foreach (var sendSession in session.AppServer.GetAllSessions())
            {
                sendSession.Send(msg);
            }
        }

        public Bitmap CreateImgCode(string htmlUrl, int size = 4)
        {
            //创建二维码生成类  
            QRCodeEncoder qrCodeEncoder = new QRCodeEncoder();
            //设置编码模式  
            qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
            //设置编码测量度  
            qrCodeEncoder.QRCodeScale = size;
            //设置编码版本  
            qrCodeEncoder.QRCodeVersion = 7;
            //设置编码错误纠正  
            qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.M;
            //生成二维码图片  
            return qrCodeEncoder.Encode(CreateQRCode(htmlUrl));
        }

        private string CreateQRCode(string htmlUrl)
        {
            string s = string.Format("{0}?ip={1}&port={2}", htmlUrl, ip, port);
            return s;
        }

        private bool IsIP(string ip)
        {
            return Regex.IsMatch(ip, @"^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$");
        }
    }
}
