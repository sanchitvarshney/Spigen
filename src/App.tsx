
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import POLayout from "./layouts/POLayout";
import SOLayout from "./layouts/SOLayout";
import HomePage from "./pages/HomePage";
import CreatePoPage from "./pages/CreatePoPage";
import CompletedPOPage from "./pages/CompletedPOPage";
import ApprovePOPage from "./pages/ApprovePOPage";
import ManagePoPage from "./pages/ManagePoPage";
import LoginPage from "./pages/LoginPage";
import AddPOPage from "./pages/AddPOPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterSalesOrderPage from "./pages/salesModule/RegisterSalesOrderPage";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./font.css";
import Protected from "./components/Protected";
import Custom404Page from "./pages/Custom404Page";

// Define the authenticated routes
const router = createBrowserRouter([
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Protected>
    ),
    path: "/",
  },
  {
    element: (
      <Protected authentication={false}>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </Protected>
    ),
    path: "/login",
  },
  {
    element: (
      <Protected authentication={false}>
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      </Protected>
    ),
    path: "/forgot-password",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <POLayout>
            <CreatePoPage />
          </POLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/create-po",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <POLayout>
            <AddPOPage />
          </POLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/add-po",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <POLayout>
            <ManagePoPage />
          </POLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/manage-po",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <POLayout>
            <ApprovePOPage />
          </POLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/approve-po",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <POLayout>
            <CompletedPOPage />
          </POLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/completed-po",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <RegisterSalesOrderPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/register",
  },
  {
    path: "*",
    element:<MainLayout>
      <Custom404Page/>
    </MainLayout>
  }
]);

// Define the unauthenticated routes

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
