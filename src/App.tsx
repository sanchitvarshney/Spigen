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
import ForgotPassword from "./pages/ForgotPassword";
import RegisterSalesOrderPage from "./pages/salesModule/RegisterSalesOrderPage";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./font.css";
import Protected from "./components/Protected";
import Custom404Page from "./pages/Custom404Page";
import CreateSalesOrderPage from "./pages/salesModule/CreateSalesOrderPage";
import SalesShipmentPage from "./pages/salesModule/SalesShipmentPage";
import SalesInvoicePage from "./pages/salesModule/SalesInvoicePage";
import AllocatedInvoicesPage from "./pages/salesModule/AllocatedInvoicesPage";
import SalesETransactionRegisterPage from "./pages/salesModule/SalesETransactionRegisterPage";
import GridExample from "./pages/GridExample";
import AddSalesOrderPage from "./pages/salesModule/AddSalesOrderPage";
import MasterProductLayout from "./layouts/MasterProductLayout";
import MasterProductFgPage from "./pages/masterModule/MasterProductFgPage";
import MasterProductSfgPage from "./pages/masterModule/MasterProductSfgPage";

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
            <CreateSalesOrderPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/create",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <AddSalesOrderPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/add",
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
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <SalesShipmentPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/shipments",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <SalesInvoicePage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/invoice",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <AllocatedInvoicesPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/allocated",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <SOLayout>
            <SalesETransactionRegisterPage />
          </SOLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/sales/order/e-transaction-register",
  },
 
  //master moduls
  {
    element: (
      <Protected authentication>
        <MainLayout>
         <MasterProductLayout>
          <MasterProductFgPage/>
         </MasterProductLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/master/product/fg",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
         <MasterProductLayout>
          <MasterProductSfgPage/>
         </MasterProductLayout>
        </MainLayout>
      </Protected>
    ),
    path: "/master/product/sfg",
  },
  {
    element: (
      <Protected authentication>
        <MainLayout>
          <GridExample />
        </MainLayout>
      </Protected>
    ),
    path: "/grid",
  },
 
  {
    path: "*",
    element: (
      <MainLayout>
        <Custom404Page />
      </MainLayout>
    ),
  },
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
