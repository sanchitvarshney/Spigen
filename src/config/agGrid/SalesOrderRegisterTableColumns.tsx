import { RowData } from "@/types/SalesOrderRegisterType";
import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef<RowData>[] = [
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter'},
    { headerName: 'Order ID', field: 'orderId', filter: 'agTextColumnFilter'},
    { headerName: 'Customer Code', field: 'customerCode', filter: 'agTextColumnFilter' },
    { headerName: 'Customer Name', field: 'customerName', filter: 'agTextColumnFilter' },
    { headerName: 'Cost Center', field: 'costCenter', filter: 'agTextColumnFilter' },
    { headerName: 'Delivery Terms', field: 'deliveryTerms', filter: 'agDateColumnFilter' },
    { headerName: 'Payment Terms', field: 'paymentTerms', filter: 'agTextColumnFilter' },
    { headerName: 'Status', field: 'status', filter: 'agTextColumnFilter' },
    { headerName: 'Created By', field: 'createdBy', filter: 'agTextColumnFilter' }
  ];