import { IpcMainInvokeEvent, IpcRendererEvent } from "electron";

export type NativeAPIHandler = (e: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any;
export type NativeAPICallbackHandler = (e: IpcRendererEvent, ...args: any[]) => void;