
const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu} = electron; //Menu generated for the purposes of visiting new URLs.


let pluginName = null; //put the right flash plugin in depending on the operating system.
switch (process.platform) {
	case 'win32':
		switch (process.arch) {
			case 'ia32':
			case 'x32':
				pluginName = 'flashver/pepflashplayer32.dll'
				console.log("ran!");
				break
			case 'x64':
				pluginName = 'flashver/pepflashplayer64.dll'
				console.log("ran!");
				break
		}
		break
	case 'linux':
		switch (process.arch) {
			case 'ia32':
			case 'x32':
				pluginName = 'flashver/libpepflashplayer.so' // added and tested :D
				break
			case 'x64':
				pluginName = 'flashver/libpepflashplayer.so'
				break
		}

		app.commandLine.appendSwitch('no-sandbox');
		break
	case 'darwin':
		pluginName = 'flashver/PepperFlashPlayer.plugin'
		break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));

app.on('ready', function () {
	let win = new BrowserWindow({
		show: false,
		//fullscreen: true,
		skipTaskbar: true,
		autoHideMenuBar: true,
		titleBarStyle: 'hidden',
		webPreferences: {
			plugins: true
		}
	})
	win.loadURL("https://www.tony-b.org/all-stars");
	win.maximize();
	setTimeout(() => {
		win.show(); //pauses program for 1 second to allow web-page to load before rendering.
		win.webContents.session.clearCache(function () {
			//clearCache
		});
	}, 1000);

	
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit(); //fricking darwin!! >:D
})