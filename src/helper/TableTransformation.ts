
export const transformSalesOrderRegisterData = (data: any[]) => {
    return data.map((item,i) => ({
        id:i+1,
        orderId:item.req_id,
        customerCode:item.customer_code,
        customerName:item.customer,
        costCenter:item.cost_center,
        deliveryTerms:item.delivery_terms,
        paymentTerms:item.payment_terms,
        status:item.status,
        createdBy:item.created_by
    }));
  };
  
  interface TransformedDataItem {
    id: number;
    orderId: string;
    customerCode: string;
    customerName: string;
    costCenter: string;
    deliveryTerms: string;
    paymentTerms: string;
    status: string;
    createdBy: string;
  }
//   id: number;
//   orderId: string;
//   customerCode: string;
//   customerName: string;
//   costCenter: string;
//   deliveryTerms: string;
//   paymentTerms: string;
//   status: string;
//   createdBy: string;
export type TransformFunction = (data: any[]) => TransformedDataItem[];