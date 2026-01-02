import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarHeader } from "./ui/sidebar";

export default function CompactEditorSidebarHeader() {
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
                        <DropdownMenuItem>Open Folder</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SidebarHeader>
    )
}