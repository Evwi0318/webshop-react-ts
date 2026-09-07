import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";

import { CartProvider } from "./context/CartProvider";
import { router } from "./router";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </MantineProvider>
  </StrictMode>,
);
