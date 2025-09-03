const { app, BrowserWindow, ipcMain, screen } = require("electron");

const path = require("path");

let win;

function createWindow() 
{
  win = new BrowserWindow
  (
  {
    width: 360,
    height: 600,
    resizable: true,        // allow resizing
    frame: true,            // no default frame
    titleBarStyle: "hidden", // hide title bar
    backgroundColor: "#4e494d", // dark gray background
    title: " ",              // no title text
    webPreferences: 
    {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, 
      nodeIntegration: false
    }
  });

  // Set minimum size to initial size to prevent resizing smaller
  win.setMinimumSize(360, 600);

  win.loadFile("calculator.html");
  win.center();

  // Remove default menu
  win.setMenu(null);

}

// App lifecycle
app.whenReady().then(() => 
{
  createWindow();

  app.on("activate", () => 
  {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => 
{
  if (process.platform !== "darwin") app.quit();
});

// IPC handlers (only once, outside function)
ipcMain.on("window-minimize", () => 
{
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => 
{
  if (win)
  {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  }
});

ipcMain.on("window-close", () => 
{
  if (win) win.close();
});