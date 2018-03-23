using LibraServer.webSocketServer;
using MahApps.Metro.Controls;
using System;
using System.Drawing;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media.Imaging;
using System.Net.NetworkInformation;
using System.Net.Sockets;

namespace LibraServer
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : MetroWindow
    {

        private Server webSocketServer;

        public MainWindow()
        {
            InitializeComponent();

            webSocketServer = new Server();
            webSocketServer.OnLog += OnWebSocketServerLog;

            ipTextBlock.Text = GetIP();
        }

        private void OnWebSocketServerLog(string log)
        {
            this.logListBox.Dispatcher.Invoke(new Action(delegate
            {
                logListBox.Items.Add(log);
                logListBox.ScrollIntoView(logListBox.Items[logListBox.Items.Count - 1]);
            }));
        }

        private void ShowImgCode(Bitmap bitmap)
        {
            BitmapSource bs = Imaging.CreateBitmapSourceFromHBitmap(bitmap.GetHbitmap(), IntPtr.Zero, Int32Rect.Empty, BitmapSizeOptions.FromEmptyOptions());
            qrCodeImg.Source = bs;
            qrCodeImg.Width = bs.PixelWidth;
            qrCodeImg.Height = bs.PixelHeight;
        }

        private void OnStartServer(object sender, RoutedEventArgs e)
        {
            if (webSocketServer.Start(ipTextBlock.Text, (int)portNumeric.Value))
            {
                ShowImgCode(webSocketServer.CreateImgCode(html5TextBox.Text));
            }
        }

        private void OnStopServer(object sender, RoutedEventArgs e)
        {
            webSocketServer.Stop();
        }

        private string GetIP()
        {
            NetworkInterface[] adapters = NetworkInterface.GetAllNetworkInterfaces(); ;
            foreach (NetworkInterface adapter in adapters)
            {
                if (adapter.Supports(NetworkInterfaceComponent.IPv4))
                {
                    // 找到当前正在连接的网卡
                    if (adapter.OperationalStatus == OperationalStatus.Up)
                    {
                        UnicastIPAddressInformationCollection uniCast = adapter.GetIPProperties().UnicastAddresses;
                        if (uniCast.Count > 0)
                        {
                            foreach (UnicastIPAddressInformation uni in uniCast)
                            {
                                //得到IPv4的地址。 AddressFamily.InterNetwork指的是IPv4
                                if (uni.Address.AddressFamily == AddressFamily.InterNetwork)
                                {
                                    return uni.Address.ToString();
                                }
                            }
                        }
                    }
                }
            }
            return null;
        }
    }
}
