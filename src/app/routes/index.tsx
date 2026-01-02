import { createFileRoute } from "@tanstack/react-router";
import Editor from "@monaco-editor/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-full flex flex-col gap-y-2">
      <div className="">layout.tsx</div>
      <div className="flex-1">
        <Editor
          height="100%"
          theme="vs-light"
          defaultLanguage="markdown"
          defaultValue="# Hello"
        />
      </div>
    </div>

  );
}
