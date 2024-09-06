import { RowData } from "@/types/SalesInvoiceTypes";
import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef<RowData>[] = [

  { headerName: "S.No.", valueGetter: "node.rowIndex + 1", maxWidth: 50 },
  { headerName: "SO ID", field: "so_id", filter: "agNumberColumnFilter" },
  {
    headerName: "Date",
    field: "delivery_challan_dt",
    filter: "agDateColumnFilter",
  },
  { headerName: "Channel", field: "channel", filter: "agDateColumnFilter" },
  {
    headerName: "Invoice Number",
    field: "so_ship_invoice_id",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Bill To Code",
    field: "client_code",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Bill To",
    field: "shipToName",
    filter: "agTextColumnFilter",
    maxWidth: 400,
  },
  {
    headerName: "EwayBill Created",
    field: "isEwayBill",
    valueGetter: (params) => (params?.data?.isEwayBill === "N" ? "No" : "Yes"),
  },
  {
    headerName: "EInvoice Created",
    field: "isEInvoice",
    valueGetter: (params) => (params?.data?.isEInvoice === "N" ? "No" : "Yes"),
  },
];
