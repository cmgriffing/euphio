const { ipcMain, app } = require('electron');

export default function() {
  // getUserDataPath
  ipcMain.on('getUserDataPath', (event) => {
    event.returnValue = app.getPath('userData');
  });
}