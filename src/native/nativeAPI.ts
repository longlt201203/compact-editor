import { openAndReadFolderStructure, readFolderStructure } from "./apis";
import { NativeAPIHandler } from "./types";

export const nativeAPI: Record<string, NativeAPIHandler> = {
    readFolderStructure,
    openAndReadFolderStructure
};