import { NativeAPIHandler } from "../types";
import * as fs from "fs";

export const writeFileContent: NativeAPIHandler = async (e, filePath: string, content: string) => {
    fs.writeFileSync(filePath, content, "utf-8");
}