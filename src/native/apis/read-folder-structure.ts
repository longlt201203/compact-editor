import { FileInfo, NativeAPIHandler } from "../types";
import * as fs from "fs";
import * as path from "path";

export const readFolderStructure: NativeAPIHandler = (e, folderPath: string) => {
    const files = fs.readdirSync(folderPath);
    const tree: FileInfo[] = files.map((filename) => {
        const filePath = path.join(folderPath, filename);
        const stat = fs.statSync(filePath);
        return {
            name: filename,
            isDirectory: stat.isDirectory(),
            fullPath: filePath
        };
    });
    return tree;
}