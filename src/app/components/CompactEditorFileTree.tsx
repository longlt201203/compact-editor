import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ChevronRight, FileIcon, FolderIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export interface FileTreeElement {
  id: string;
  name: string;
  isFolder: boolean;
  children?: FileTreeElement[];
}

const INDENT_STEP = 12; // px per depth level

export function findTreeElementById(
  id: string,
  elements: FileTreeElement[]
): FileTreeElement | null {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }
    if (element.children) {
      const found = findTreeElementById(id, element.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findElementPathById(
  id: string,
  elements: FileTreeElement[]
): string {
  const dfs = (
    nodes: FileTreeElement[],
    currentPath: string[]
  ): string | null => {
    for (const node of nodes) {
      const newPath = [...currentPath, node.name];

      if (node.id === id) {
        return newPath.join("/");
      }

      if (node.children && node.children.length > 0) {
        const childResult = dfs(node.children, newPath);
        if (childResult) {
          return childResult;
        }
      }
    }

    return null;
  };

  return dfs(elements, []) ?? "";
}

export interface CompactEditorFileTreeFolderProps extends PropsWithChildren {
  depth: number;
  element: FileTreeElement;
  onClick?: (element: FileTreeElement) => void;
}

export function CompactEditorFileTreeFolder({
  depth,
  element,
  onClick,
  children,
}: CompactEditorFileTreeFolderProps) {
  const marginLeft = depth * INDENT_STEP;

  return (
    <Collapsible>
      <CollapsibleTrigger
        style={{ marginLeft }}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-sidebar-foreground transition data-[state=open]:bg-sidebar-accent/40 data-[state=open]:text-sidebar-primary data-[state=open]:[&>svg.caret]:rotate-90 hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring"
        onClick={() => onClick && onClick(element)}
      >
        <ChevronRight className="caret size-3 text-muted-foreground transition" />
        <FolderIcon className="size-3.5 text-muted-foreground" />
        <span className="truncate">{element.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export interface CompactEditorFileTreeFileProps {
  element: FileTreeElement;
  depth: number;
  onClick?: (element: FileTreeElement) => void;
  isActive?: boolean;
}

export function CompactEditorFileTreeFile({
  element,
  depth,
  onClick,
  isActive = false,
}: CompactEditorFileTreeFileProps) {
  const marginLeft = depth * INDENT_STEP;
  const iconColor = isActive ? "text-sidebar-primary" : "text-muted-foreground";
  const textColor = isActive
    ? "text-sidebar-primary"
    : "text-sidebar-foreground";
  const hoverState = isActive
    ? "bg-sidebar-accent/80"
    : "text-muted-foreground hover:bg-sidebar-accent/60";

  return (
    <button
      type="button"
      style={{ marginLeft }}
      className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring ${hoverState}`}
      data-active={isActive ? "true" : undefined}
      role="treeitem"
      aria-selected={isActive}
      onClick={() => onClick && onClick(element)}
    >
      <FileIcon className={`size-3.5 ${iconColor}`} />
      <span className={`truncate ${textColor}`}>{element.name}</span>
    </button>
  );
}

export interface CompactEditorFileTreeProps {
  elements: FileTreeElement[];
  onFolderClick?: (element: FileTreeElement) => void;
  onFileClick?: (element: FileTreeElement) => void;
}

export default function CompactEditorFileTree({
  elements,
  onFileClick,
  onFolderClick,
}: CompactEditorFileTreeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleFileClick = useCallback(
    (element: FileTreeElement) => {
      setSelectedId(element.id);
      onFileClick?.(element);
    },
    [onFileClick]
  );

  const renderElements = useCallback(
    (nodes: FileTreeElement[], depth: number) => {
      return nodes.map((element) => {
        if (element.isFolder) {
          return (
            <CompactEditorFileTreeFolder
              key={element.id}
              element={element}
              depth={depth}
              onClick={onFolderClick}
            >
              {element.children &&
                element.children.length > 0 &&
                renderElements(element.children, depth + 1)}
            </CompactEditorFileTreeFolder>
          );
        }

        return (
          <CompactEditorFileTreeFile
            key={element.id}
            element={element}
            onClick={handleFileClick}
            depth={depth}
            isActive={selectedId === element.id}
          />
        );
      });
    },
    [handleFileClick, onFolderClick, selectedId]
  );

  const tree = useMemo(
    () => renderElements(elements, 0),
    [elements, renderElements]
  );

  if (elements.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-sidebar-border/80 bg-sidebar px-3 py-4 text-[11px] text-muted-foreground">
        No files yet. Use the Open Folder action to populate the tree.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-0.5" role="tree">
      {tree}
    </div>
  );
}
