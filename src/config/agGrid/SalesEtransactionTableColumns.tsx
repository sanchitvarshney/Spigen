import { RowData } from "@/types/SalesEtransactionTypes";
import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef<RowData>[] = [
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter' },
    { headerName: 'Invoice Date', field: 'invoiceDate', filter: 'agDateColumnFilter' },
    { headerName: 'Invoice Number', field: 'invoiceNumber', filter: 'agTextColumnFilter' },
    { headerName: 'Client', field: 'client', filter: 'agTextColumnFilter' },
    { headerName: 'Client Code', field: 'clientCode', filter: 'agTextColumnFilter' },
    { headerName: 'E-Invoice Number', field: 'eInvoiceNumber', filter: 'agTextColumnFilter' },
    { headerName: 'E-Invoice Date', field: 'eInvoiceDate', filter: 'agDateColumnFilter' },
    { headerName: 'IRN Number', field: 'irnNumber', filter: 'agTextColumnFilter' },
    { headerName: 'Client Address', field: 'clientAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Billing Address', field: 'billingAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Shipping Address', field: 'shippingAddress', filter: 'agTextColumnFilter' }
  ];