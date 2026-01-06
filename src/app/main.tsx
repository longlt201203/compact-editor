import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./lib/redux";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const history = createMemoryHistory({ initialEntries: ["/"] });

// Create a new router instance
const router = createRouter({ routeTree, history });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ReduxProvider store={reduxStore}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </StrictMode>
  );
}
