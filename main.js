import { app, globalShortcut, shell, Menu, BrowserWindow } from 'electron';
import path from 'node:path';

const template = [
  ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
  {
    label: 'File',
    submenu: [
      { 
        label: 'Settings',
        click: async () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          focusedWindow.loadFile("settings.html");
        }
      },
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.on('page-title-updated', (event) => event.preventDefault());
  mainWindow.title = `InfoScreen Presenter ${app.getVersion()}`;
  mainWindow.maximize();
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  globalShortcut.register('Escape', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow && focusedWindow.isFullScreen()) focusedWindow.setFullScreen(false);
  });
})

app.on('window-all-closed', function () {
  globalShortcut.unregisterAll();
  app.quit();
})
