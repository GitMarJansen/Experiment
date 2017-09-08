using Hardcodet.Wpf.TaskbarNotification;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Windows;
using System.Windows.Input;
using SystrayMonitor.Helpers;
using SystrayMonitor.Properties;

namespace SystrayMonitor
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Timer _timer;
        public ICommand ShowWindow { get; set; }

        public ObservableCollection<Site> Sites { get; set; } = new ObservableCollection<Site>();

        public MainWindow()
        {
            InitializeComponent();
            ShowWindow = new RelayCommand(a => DoShowWindow());
            Closing += MainWindow_Closing;

            DataContext = this;
            tbIcon.Icon = Properties.Resources.Question;
            _timer = new Timer(CheckUrlsAsync, null, 1000, 10000);
            var sites = Settings.Default.Urls.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries).Select(s => new Site { Url = s }).ToList();
            sites.ForEach(Sites.Add);
        }

        private async void CheckUrlsAsync(object state)
        {
            bool allOkay = true;
            tbIcon.Icon = Properties.Resources.Question;
            using (HttpClientHandler handler = new HttpClientHandler { Credentials = new NetworkCredential() })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    foreach (var site in Sites)
                    {
                        bool success = true;
                        try
                        {
                            var response = await client.GetAsync(site.Url);
                            success = response.IsSuccessStatusCode;
                        }
                        catch
                        {
                            success = false;
                        }
                        if (!success)
                        {
                            if (site.Okay)
                            {
                                tbIcon.ShowBalloonTip("Failed", site.Url, BalloonIcon.Error);
                            }
                            tbIcon.Icon = Properties.Resources.Error;

                            allOkay = false;
                        }
                        site.Okay = success;
                    }
                }
            }
            tbIcon.Icon = allOkay ? Properties.Resources.Ok : Properties.Resources.Error;
        }

        private void DoShowWindow()
        {
            Visibility = (Visibility == Visibility.Visible) ? Visibility.Collapsed : Visibility.Visible;
            Activate();
        }

        private void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Visibility = Visibility.Hidden;
            e.Cancel = true;
        }
    }

    public class Site : INotifyPropertyChanged
    {
        private bool _okay;
        public string Url { get; set; }

        public bool Okay
        {
            get { return _okay; }
            set
            {
                _okay = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Okay)));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}