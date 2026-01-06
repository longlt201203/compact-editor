import { FileInfo, NativeAPICallbackHandler, OpenFolderResult } from "../native/types";

interface nativeAPI {
    nativeAPICallback: (channel: string, cb: NativeAPICallbackHandler) => () => void;
    readFolderStructure: (folderPath: string) => Promise<FileInfo[]>;
    openAndReadFolderStructure: () => Promise<OpenFolderResult>;
    readFileContent: (filePath: string) => Promise<string>;
    writeFileContent: (filePath: string, content: string) => Promise<void>;
}

declare global {
    interface Window {
        nativeAPI: nativeAPI;
    }
}

export { };