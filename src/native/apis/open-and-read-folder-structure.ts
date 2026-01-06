import { dialog } from "electron";
import { NativeAPIHandler, OpenFolderResult } from "../types";
import { readFolderStructure } from "./read-folder-structure";

export const openAndReadFolderStructure: NativeAPIHandler = async (e): Promise<OpenFolderResult | null> => {
    const result = await dialog.showOpenDialog({
        title: "Select Folder",
        properties: ["openDirectory"]
    })
    if (result.canceled || result.filePaths.length === 0) {
        return null;
    }
    const folderPath = result.filePaths[0];
    return {
        rootPath: folderPath,
        tree: await readFolderStructure(e, folderPath)
    };
}