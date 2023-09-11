"use strict";
exports.__esModule = true;
//electron.ts
var path = require("path");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var BASE_URL = "http://localhost:4000";
var mainWindow;
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 500,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
        }
    });
    mainWindow.once("ready-to-show", function () {
        mainWindow.show();
    });
    if (isDev) {
        mainWindow.loadURL(BASE_URL);
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
    }
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    mainWindow.setMenu(null);
}
electron_1.app.on("ready", function () {
    createMainWindow();
});
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
