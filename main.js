const electron = require( 'electron' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require( 'path' );
const url = require( 'url' );
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });
    //mainWindow.setMenu( null );
    mainWindow.maximize();
    mainWindow.loadURL( url.format({
        pathname: path.join( __dirname, './docs/index.html' ),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});