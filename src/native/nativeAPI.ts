import { openAndReadFolderStructure, readFileContent, readFolderStructure, writeFileContent } from "./apis";
import { NativeAPIHandler } from "./types";

export const nativeAPI: Record<string, NativeAPIHandler> = {
    readFolderStructure,
    openAndReadFolderStructure,
    readFileContent,
    writeFileContent
};