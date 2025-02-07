using Reciever.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
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
            Transmitters.Add(new Transmitter() { ID = "numero uno" });
            Transmitters.Add(new Transmitter() { ID = "numero 2" });
            Transmitters.Add(new Transmitter() { ID = "numero drei" });
            Transmitters.Add(new Transmitter() { ID = "numero catre" });

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
                Console.WriteLine(e.Data);
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
