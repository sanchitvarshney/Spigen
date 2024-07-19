import ReusableTable from "@/components/shared/ReusableTable";
import { transformSalesOrderRegisterData } from "@/helper/TableTransformation";



const GridExample = () => {
  const columns1 = [
    { headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter' },
    { headerName: 'Order ID', field: 'orderId', filter: 'agTextColumnFilter' },
    { headerName: 'Customer Code', field: 'customerCode', filter: 'agTextColumnFilter' },
    { headerName: 'Customer Name', field: 'customerName', filter: 'agTextColumnFilter' },
    { headerName: 'Cost Center', field: 'costCenter', filter: 'agTextColumnFilter' },
    { headerName: 'Delivery Terms', field: 'deliveryTerms', filter: 'agDateColumnFilter' },
    { headerName: 'Payment Terms', field: 'paymentTerms', filter: 'agTextColumnFilter' },
    { headerName: 'Status', field: 'status', filter: 'agTextColumnFilter' },
    { headerName: 'Created By', field: 'createdBy', filter: 'agTextColumnFilter' }
  ];


  return (
    
      <div>
        <h1>Data Table 1</h1>
        <ReusableTable endpoint="/sellRequest/fetchSellRequestList" columns={columns1} payload={{wise: "DATE", data: "01-07-2024-19-07-2024"}} transform={transformSalesOrderRegisterData}/>

        <h1>Data Table 2</h1>
        {/* <ReusableTable endpoint="/so_challan_shipment/fetchSalesOrderShipmentlist" columns={columns2} /> */}
      </div>
   
  );
};

export default GridExample;
