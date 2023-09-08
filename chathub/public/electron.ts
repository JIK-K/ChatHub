//electron.ts
import * as path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";

const BASE_URL = "http://localhost:4000";

let mainWindow: BrowserWindow | null;

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  ipcMain.on("dbthfudqheoddl", (event, arg) => {
    console.log(arg);
    event.sender.send("dbthfudQkdeoddl", "zz");
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow!.show();
  });

  if (isDev) {
    mainWindow.loadURL(BASE_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });

  mainWindow.setMenu(null);
}

app.on("ready", (): void => {
  createMainWindow();
});

app.on("window-all-closed", (): void => {
  app.quit();
});

app.on("activate", (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
