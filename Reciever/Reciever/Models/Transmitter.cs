using Nefarius.ViGEm.Client.Targets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Reciever.Models
{
	class Transmitter
    {
        public string ID { get; set; }
        private IDualShock4Controller _controller;

        public Transmitter(string ID)
        {
            this.ID = ID;
            InitController();
        }

        private void InitController()
        {
			_controller = App.ViGEmClient.CreateDualShock4Controller();

			_controller.Connect();
        }


		private void UpdateController(int buttonID)
        {
         
        }

	}
}
