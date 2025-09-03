const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", 
{
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  maximize: () => ipcRenderer.send("window-maximize"),
  refresh: () => ipcRenderer.send("window-refresh")
});