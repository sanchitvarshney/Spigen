
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

  export const transformBillingTable = (data:any[])=>{
    return data.map((item)=>({
      label:item.label,
      company:item.company,
      pan:item.pan,
      state:item.state,
      gst:item.gst,
      address:item.address,
      addressLine1:item.addressLine1,
      addressLine2:item.addressLine2,
      cin:item.cin,
      insert_dt:item.insert_dt
      
    }))
  }

 
export const transformCustomerTableData = (data:any[])=>{

  return data.map((item)=>({
    clientID:item.code,
    name:item.name,
    email:item.email,
    mobile:item.mobile,
    pan:item.panNo,
    status:item.status
  }))
}

export const transformEditViewTable = (data:any[])=>{
  return data.map((item)=>({
    addressId:item.addressID,
    city:item.city.name,
    address:item.address,
    gst:item.gst,
    contact:item.phoneNo,
    pinCode:item.pinCode
  }))
}
export const transformProductTable = (data:any[])=>{
  return data.map((item)=>({
    productName:item.p_name,
    sku:item.p_sku,
    unit:item.units_name,
    productKey:item.product_key
    
  }))
}
export type TransformFunction = (data: any[]) => TransformedDataItem[];

