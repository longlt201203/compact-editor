import { createFileRoute } from "@tanstack/react-router";
import Editor from "@monaco-editor/react";
import { useAppSelector } from "../hooks/use-app-selector";
import { useEffect, useState } from "react";
import { getProgrammingLanguageFromFileName } from "../lib/programming-language";
import { findElementPathById } from "../components/CompactEditorFileTree";
import { useQuery } from "@tanstack/react-query";
import { useDebounceEffect } from "../hooks/use-debounce-effect";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [value, setValue] = useState<string>();
  const fileTreeState = useAppSelector((state) => state.fileTree);
  const currentFile = fileTreeState.currentFile;

  const fileContentQuery = useQuery({
    queryKey: ['fileContent', currentFile?.id],
    enabled: !!currentFile,
    queryFn: async () => {
      const elementPath = findElementPathById(currentFile!.id, fileTreeState.elements);
      const filePath = `${fileTreeState.rootPath}/${elementPath}`;
      return await window.nativeAPI.readFileContent(filePath);
    },
    staleTime: 1000
  });

  useEffect(() => {
    if (!currentFile) {
      setValue("");
      return;
    }

    if (fileContentQuery.isSuccess) {
      setValue(fileContentQuery.data ?? "");
    }
  }, [currentFile?.id, fileContentQuery.data, fileContentQuery.isSuccess]);

  useDebounceEffect(() => {
    if (!currentFile) return;
    const elementPath = findElementPathById(currentFile.id, fileTreeState.elements);
    const filePath = `${fileTreeState.rootPath}/${elementPath}`;
    window.nativeAPI.writeFileContent(filePath, value || "");
  }, [value], 2000);

  return (
    <div className="h-full flex flex-col gap-y-2">
      <div className="">{currentFile ? currentFile.name : "No file selected"}</div>
      <div className="flex-1">
        <Editor
          height="100%"
          theme="vs-light"
          language={getProgrammingLanguageFromFileName(currentFile ? currentFile.name : "")}
          value={value}
          onChange={(value) => setValue(value || "")}
        />
      </div>
    </div>
  );
}
