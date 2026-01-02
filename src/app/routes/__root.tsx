import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider as ReduxProvider } from "react-redux"
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "../components/ui/sidebar";
import CompactEditorSidebarHeader from "../components/CompactEditorSidebarHeader";
import CompactEditorSidebarFooter from "../components/CompactEditorSidebarFooter";
import CompactEditorSidebarContent from "../components/CompactEditorSidebarContent";
import RightSidebar from "../components/RightSidebar";
import { reduxStore } from "../lib/redux";

const RootLayout = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <SidebarProvider>
        <Sidebar variant="inset">
          <CompactEditorSidebarHeader />
          <CompactEditorSidebarContent />
          <CompactEditorSidebarFooter />
        </Sidebar>
        <SidebarInset>
          <div className="p-4 h-full flex">
            <div className="flex-1 h-full">
              <Outlet />
            </div>
            <RightSidebar />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <TanStackRouterDevtools />
    </ReduxProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
