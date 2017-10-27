const electron = require( 'electron' );
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require( 'path' );
const url = require( 'url' );
let mainWindow;
const template = [
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  }
];

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });
    // const menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);
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