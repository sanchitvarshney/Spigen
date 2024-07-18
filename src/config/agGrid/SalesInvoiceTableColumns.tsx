import { RowData } from "@/types/SalesInvoiceTypes";
import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef<RowData>[] = [
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter' },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
    { headerName: 'Invoice Number', field: 'invoiceNumber', filter: 'agTextColumnFilter' },
    { headerName: 'Client Code', field: 'clientCode', filter: 'agTextColumnFilter' },
    { headerName: 'Client', field: 'client', filter: 'agTextColumnFilter' },
    { headerName: 'Billing Address', field: 'billingAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Shipping Address', field: 'shippingAddress', filter: 'agTextColumnFilter' }
  ];

  