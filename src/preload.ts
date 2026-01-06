// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";
import { NativeAPICallbackHandler } from "./native/types";

const nativeAPINames: string[] = ["readFolderStructure", "openAndReadFolderStructure"];

const api: Record<string, any> = {};
for (const name of nativeAPINames) {
    api[name] = (...args: any[]) => ipcRenderer.invoke(name, ...args);
}

contextBridge.exposeInMainWorld("nativeAPI", {
    nativeAPICallback: (channel: string, cb: NativeAPICallbackHandler) => {
        ipcRenderer.on(channel, cb);
        return () => ipcRenderer.off(channel, cb);
    },
    ...api,
});
