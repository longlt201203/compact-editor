import { FileInfo, OpenFolderResult } from "../native/types";

interface nativeAPI {
    readFolderStructure: (folderPath: string) => Promise<FileInfo[]>;
    openAndReadFolderStructure: () => Promise<OpenFolderResult>;
}

declare global {
    interface Window {
        nativeAPI: nativeAPI;
    }
}

export { };