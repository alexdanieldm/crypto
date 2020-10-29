//* Electron Configuration
const { app, BrowserWindow } = require('electron');
const server = require('./index')

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 700,
		webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        icon: './public/assets/images/icon.png'
	});
    mainWindow.setMenu(null);
    mainWindow.loadURL('http://localhost:3000/')

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
	if (mainWindow === null) createWindow();
});