const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');
const fs = require('fs');

const menu = require('./menu');

const BILLOGRAM_URL = 'https://billogram.com/login';

app.on('ready', () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 800,
  });

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    maxWidth: 1200,
    minWidth: 500,
    minHeight: 800,
    titleBarStyle: 'hidden',
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindowState.manage(win);

  win.loadURL(BILLOGRAM_URL);

  const css = fs.readFileSync(`${__dirname}/static/custom.css`, 'utf-8');
  win.webContents.on('dom-ready', () => win.webContents.insertCSS(css));

  menu();
});
