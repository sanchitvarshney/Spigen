
import { ColDef } from "ag-grid-community";
export const columnDefs: ColDef[] = [
    { headerName: '', field: 'action',maxWidth:50 ,
      cellRenderer: 'shipmentsActionRenderer',
    },
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter', maxWidth:100 },
    { headerName: 'Shipment ID', field: 'shipmentId', filter: 'agTextColumnFilter' },
    { headerName: 'SO ID', field: 'soId', filter: 'agTextColumnFilter' },
    { headerName: 'Item Part Code', field: 'itemPartCode', filter: 'agTextColumnFilter' },
    { headerName: 'Item Part Name', field: 'itemPartName', filter: 'agTextColumnFilter' },
    { headerName: 'Item Qty', field: 'itemQty', filter: 'agNumberColumnFilter' },
    { headerName: 'Item Rate', field: 'itemRate', filter: 'agNumberColumnFilter' },
    { headerName: 'Shipment Date', field: 'shipmentDate', filter: 'agDateColumnFilter' },
    { headerName: 'Client Code', field: 'clientCode', filter: 'agTextColumnFilter' },
    { headerName: 'Client', field: 'client', filter: 'agTextColumnFilter' },
    { headerName: 'Client Address', field: 'clientAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Billing Name', field: 'billingName', filter: 'agTextColumnFilter' },
    { headerName: 'Billing Address', field: 'billingAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Shipping Name', field: 'shippingName', filter: 'agTextColumnFilter' },
    { headerName: 'Shipping Address', field: 'shippingAddress', filter: 'agTextColumnFilter' },
    { headerName: 'Status', field: 'status', filter: 'agTextColumnFilter' }
  ];