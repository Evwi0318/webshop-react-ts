import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Admin } from "./pages/Admin";
import { AdminProductForm } from "./pages/AdminProductForm";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductDetail } from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "checkout", element: <Checkout /> },
      { path: "confirmation/:orderNumber", element: <Confirmation /> },
      { path: "admin", element: <Admin /> },
      { path: "admin/new", element: <AdminProductForm /> },
      { path: "admin/:id/edit", element: <AdminProductForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
