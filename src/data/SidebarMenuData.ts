import { SidebarMenuLinkType } from "@/types/MainLayout";

export const sidebarMenulinklist: SidebarMenuLinkType[] = [
  { name: "Dashboard", path: "/" },
  {
    name: "Material Management",
    subMenu: [
      {
        name: "Master",
        subMenu: [
          {
            name: "Components",
            subMenu: [
              { name: "Material", path: "#" },
              { name: "Service", path: "#" },
            ],
          },
          { name: "Component Map", path: "#" },
          { name: "Products", path: "#" },
          { name: "HSN map", path: "#" },
          { name: "Groups", path: "#" },
          { name: "Locations", path: "#" },
          { name: "Billing address", path: "#" },
          { name: "Shipping address", path: "#" },
          {
            name: "Bill Of Material",
            subMenu: [
              { name: "Create Bom", path: "#" },
              { name: "Manage Bom", path: "#" },
            ],
          },
          { name: "Vender / Suppliar", subMenu: [{ name: "Add / Rectify", path: "#" }] },
          {
            name: "Customer / Client",
            subMenu: [
              { name: "Add", path: "#" },
              { name: "View", path: "#" },
            ],
          },
        ],
      },
      {
        name: "Procurement",
        subMenu: [
          { name: " Create PO", path: "#" },
          { name: "Manage PO", path: "#" },
          { name: "Compleated PO", path: "#" },
        ],
      },
      {
        name: "Sales Order",
        subMenu: [
          { name: "Create", path: "/create-po" },
          { name: "Register", path: "#" },
          { name: "Shipment", path: "#" },
          { name: "Invoice", path: "#" },
          { name: "Allocated Invoices", path: "#" },
          { name: "E Transaction Invoices", path: "#" },
        ],
      },
      {
        name: "Warehouse",
        subMenu: [
          { name: "MR Approval", path: "#" },
          { name: "Inward", path: "#" },
          { name: "Transfer", path: "#" },
          { name: "Pic Slip", path: "#" },
          { name: "Batch Allocation", path: "#" },
        ],
      },
      {
        name: " FG(s) Inwarding",
        subMenu: [
          { name: "Pending FG(s)", path: "#" },
          { name: "Complete FG(s)", path: "#" },
        ],
      },
      {
        name: "FG(s) OUT",
        subMenu: [
          { name: "Create FG(s) OUT", path: "#" },
          { name: "View FG(s) OUT", path: "#" },
        ],
      },
      {
        name: "Production",
        subMenu: [{ name: "PPC", path: "#" }],
      },
      {
        name: "Report (s)",
        subMenu: [
          { name: "Inventory report", path: "#" },
          { name: "Printing", path: "#" },
        ],
      },
      {
        name: "   Query (s)",
        subMenu: [{ name: "Q1-Q2", path: "#" }],
      },
      {
        name: " Physical Stock",
        subMenu: [
          { name: "Create Physical Stock", path: "#" },
          { name: "View Physical Stock", path: "#" },
        ],
      },
    ],
  },
  { name: "Customer Management", subMenu: [{ name: " Customer Enquiry", path: "#" }] },
];
