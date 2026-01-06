import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarHeader } from "./ui/sidebar";
import { useAppDispatch } from "../hooks/use-app-dispatch";
import { useCallback } from "react";
import { setFileTreeState } from "../lib/redux/file-tree.slice";

export default function CompactEditorSidebarHeader() {
  const dispatch = useAppDispatch();

  const handleOpenFile = useCallback(async () => {
    const result = await window.nativeAPI.openAndReadFolderStructure();
    dispatch(
      setFileTreeState({
        elements: result.tree.map((item, index) => ({
          id: (index + 1).toString(),
          name: item.name,
          children: item.isDirectory ? [] : undefined,
          isFolder: item.isDirectory,
        })),
        rootPath: result.rootPath,
      })
    );
  }, []);

  return (
    <SidebarHeader>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Compact Editor</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Open File</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenFile}>
              Open Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarHeader>
  );
}
