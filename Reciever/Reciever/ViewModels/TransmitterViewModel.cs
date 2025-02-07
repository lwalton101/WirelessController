using Reciever.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Threading;
using WebSocketSharp;

namespace Reciever.ViewModels
{
    class TransmitterViewModel: INotifyPropertyChanged
    {
        public ObservableCollection<Transmitter> Transmitters { get; set; }
        private WebSocket _ws;
        private string _wsConnected = "false";
        public string WSConnected {
            get => _wsConnected;
            set
            {
                _wsConnected = value;
				OnPropertyChanged(nameof(WSConnected));
			}
        }
        public TransmitterViewModel() { 
            this.Transmitters = new ObservableCollection<Transmitter>();

            InitialiseWebsockets();
        }

        private void InitialiseWebsockets()
        {
            _ws = new WebSocket("ws://localhost:8000");
            
            _ws.OnOpen += (sender, e) =>
            {
                WSConnected = "true";
            };

			_ws.OnClose += (sender, e) =>
			{
				WSConnected = "false";
			};
			_ws.OnError += (sender, e) =>
			{
                MessageBox.Show(e.Message);
			};

			_ws.OnMessage += (sender, e) =>
            {
                System.Diagnostics.Debug.WriteLine(e.Data);
                var message = e.Data.Split(";");
                var messageID = message[0];

                if(messageID == "0")
                {
					App.Current.Dispatcher.Invoke(() =>
                    {
                        Transmitters.Add(new Transmitter(message[1]));
                    });
                } 
                else if(messageID == "1")
                {
                    var toRemove = Transmitters.Where(t => t.ID == message[1]).First();
                    if(toRemove != null)
                    {
						App.Current.Dispatcher.Invoke(() =>
						{
							Transmitters.Remove(toRemove);
					    });
					}
                    //TODO: null check here
                }
                else
                {
                    MessageBox.Show($"Didn't recognise message with id {messageID}");
                }
            };

			_ws.Connect();
			_ws.Send("receiver");
		}

		private void _ws_OnOpen(object? sender, EventArgs e)
		{
			throw new NotImplementedException();
		}

		public event PropertyChangedEventHandler? PropertyChanged;

		protected void OnPropertyChanged(string propertyName)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

	}
}
