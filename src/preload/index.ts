import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Titlebar, TitlebarColor } from "custom-electron-titlebar";

export const mainColor = '#1F2443'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  const titlebar = new Titlebar({
    backgroundColor: TitlebarColor.fromHex(mainColor)
  });
  titlebar.updateTitle('PPG Timer');
});