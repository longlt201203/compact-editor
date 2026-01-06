import { FileInfo } from "./file-info";

export interface OpenFolderResult {
    rootPath: string;
    tree: FileInfo[];
}