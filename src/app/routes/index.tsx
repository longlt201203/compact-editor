import { createFileRoute } from "@tanstack/react-router";
import Editor from "@monaco-editor/react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4 h-full flex flex-col gap-y-2">
      <div className="flex gap-x-1">
        <Button size="sm" variant="ghost">
          File
        </Button>
      </div>
      <Separator />
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
