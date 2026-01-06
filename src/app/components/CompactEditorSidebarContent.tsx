import { useAppSelector } from "../hooks/use-app-selector";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { useAppDispatch } from "../hooks/use-app-dispatch";
import { setFileTreeChildren } from "../lib/redux/file-tree.slice";
import CompactEditorFileTree, {
  FileTreeElement,
  findElementPathById,
} from "./CompactEditorFileTree";

export default function CompactEditorSidebarContent() {
  const fileTreeState = useAppSelector((state) => state.fileTree);
  const dispatch = useAppDispatch();

  const handleFolderClick = async (folderElement: FileTreeElement) => {
    const elementPath = findElementPathById(
      folderElement.id,
      fileTreeState.elements
    );
    const folderPath = `${fileTreeState.rootPath}/${elementPath}`;
    const tree = await window.nativeAPI.readFolderStructure(folderPath);
    console.log("Opened folder", tree);
    if (tree.length > 0) {
      dispatch(
        setFileTreeChildren({
          id: folderElement.id,
          children: tree.map((item, index) => ({
            id: `${folderElement.id}-${index + 1}`,
            name: item.name,
            children: item.isDirectory ? [] : undefined,
            isFolder: item.isDirectory,
          })),
        })
      );
    }
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Files</SidebarGroupLabel>
        <SidebarGroupContent>
          <CompactEditorFileTree
            elements={fileTreeState.elements}
            onFileClick={(element) => console.log("File clicked:", element)}
            onFolderClick={(element) => handleFolderClick(element)}
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
