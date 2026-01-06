import { NativeAPIHandler } from "../types";
import * as fs from "fs";

export const readFileContent: NativeAPIHandler = async (e, filePath: string) => {
    return fs.readFileSync(filePath, "utf-8");
}