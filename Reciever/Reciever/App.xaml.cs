using Nefarius.ViGEm.Client;
using System.Configuration;
using System.Data;
using System.Runtime.CompilerServices;
using System.Windows;

namespace Reciever
{
	/// <summary>
	/// Interaction logic for App.xaml
	/// </summary>
	public partial class App : Application
	{
		private static ViGEmClient _client = new ViGEmClient();
		public static ViGEmClient ViGEmClient { get => _client; }

		private static bool _isQuitting = false;
		public static bool IsQuitting { get => _isQuitting;  }

		public App()
		{
			this.Exit += OnExit;
		}

		private void OnExit(object sender, ExitEventArgs e)
		{
			_isQuitting = true;
		}
	}

}
