﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reciever.Models
{
    class Transmitter
    {
        public string ID { get; set; }

        public Transmitter(string ID)
        {
            this.ID = ID;
            
        }

        private void InitController()
        {

        }
    }
}
