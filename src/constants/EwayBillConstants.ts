import { ColDef } from "ag-grid-community";
import { z } from "zod";

const columnDefs: ColDef[] = [
    { headerName: "Item Name", field: "item_name", width: 500 },
    { headerName: "Part No", field: "item_part_no" },
    { headerName: "HSN", field: "item_hsncode" },
    { headerName: "Qty", field: "item_qty" },
    { headerName: "Rate", field: "item_rate" },
    { headerName: "GST Rate", field: "item_gst_rate" },
    { headerName: "GST Type", field: "item_gst_type" },
    { headerName: "CGST", field: "item_cgst" },
    { headerName: "SGST", field: "item_sgst" },
    { headerName: "IGST", field: "item_igst" },
    { headerName: "Taxable Amount", field: "item_value" },
  ];

const supplyTypeOptions = [
    {
        value: "O",
        label: "Outward",
    },
    {
        value: "I",
        label: "Inward",
    },
  ];
  
  const subOptions = [
    { value: "B2B", label: "Business to Business" },
    { value: "SEZWP", label: "SEZ with payment" },
    { value: "SEZWOP", label: "SEZ without payment" },
    { value: "EXPWP", label: "Export with Payment" },
    { value: "EXPWOP ", label: "Export without payment" },
    { value: "DEXP", label: "Deemed Export" },
  ];
  
  const docType = [
    { value: "INV", label: "Tax Invoice" },
    { value: "BIL", label: "Bill of Supply" },
    { value: "BOE", label: "Bill of Entry" },
    { value: "CHL", label: "Delivery Challan" },
    { value: "OTH", label: "Others" },
  ];
  
  const transportationMode = [
    { value: "1", label: "Road" },
    { value: "2", label: "Rail" },
    { value: "3", label: "Air" },
    { value: "4", label: "Ship" },
    { value: "5", label: "In Transit" },
  ];
 
  const reverseOptions = [
    {
      label: "Yes",
      value: "Y",
    },
    {
      label: "No",
      value: "N",
    },
  ];
  
  

  const vehicleTypeOptions = [
    {
      label: "Regular",
      value: "R",
    },
    {
      label: "ODC(Over Dimentional Cargo)",
      value: "O",
    },
  ];
  const transactionTypeOptions = [
    {
      label: "Regular",
      value: "1",
    },
    {
      label: "Bill To - Ship To",
      value: "2",
    },
    {
      label: "Bill From - Dispatch From",
      value: "3",
    },
    {
      label: "Combination of 2 & 3",
      value: "4",
    },
  ];

  const ewayBillSchema = z.object({
    supply_type: z.string({ required_error: "Please Select Supply Type" }),
    sub_supply_type:z.string({ required_error: "Please Select Sub Supply Type" }),
    invoice_id:z.string({ required_error: "Please enter Invoice Id" }),
    document_type:z.string({ required_error: "Please select Document Type" }),
    documnet_date:z.string({ required_error: "Please enter Document Date" }),
    dispatch_name:z.string({ required_error: "Please enter Dispatch Name" }),
    dispatchfrom_pan:z.string({ required_error: "Please enter PAN Number" }),
    dispatchfrom_address1 :z.string({ required_error: "Please enter Address and Address must be between 3 and 100 characters" }),
    dispatchfrom_address2:z.string({ required_error: "Please enter Address and Address must be between 3 and 100 characters" }),
    dispatchfrom_gstin:z.string({ required_error: "Please enter GST" }),
    dispatchfrom_place:z.string({ required_error: "Please enter place" }),
    dispatchfrom_state:z.string({ required_error: "Please enter State" }),
    dispatchfrom_pincode:z.string({ required_error: "Please enter Pincode" }),
    shipto_name: z.string({ required_error: "Please select Name" }),
    // shipto_address: z.string({ required_error: "Please provide GST" }),
    shipto_gstin: z.string({ required_error: "Please enter GST" }),
    shipToAddress2:z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
    shipToAddress1:z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
    shipto_place:z.string(),
    shipTo_state_code:z.string({ required_error: "Please enter State" }),
    bill_to_state: z.string().optional(),
    shipto_pincode: z.string({ required_error: "Please enter Pincode" }),
    // transporter_id: z.string({ required_error: "Please select Billing Address" }),
    // transporter_name: z.string({ required_error: "" }),
    // billToaddress1: z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
    // billToaddress2: z.string({ required_error: "Please add your Address Description must be between 10 and 100 characters" }),
    // bill_to_pincode: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    transactionType: z.string({ required_error: "Please select Transaction Type" }),
    transporterDocNo: z.string({ required_error: "Please enter Transporter Doc No" }),
    fromPincode: z.string({ required_error: "Please enter Pincode" }),
    toPincode: z.string({ required_error: "Please enter Pincode" }),
    transDistance: z.string({required_error: "Please enter Trans Distance" }),
    transMode: z.string({required_error: "Please enter Trans Mode" }),
    transporterId: z.string({ required_error: "Please enter Transporter Id" }),
    trans_doc_date: z.string({ required_error: "Please enter Trans Doc Date" }),
    vehicleNo: z.string({ required_error: "Plase enter vehicle No" }),
    transporterName: z.string({ required_error: "Please enter Transporter Name" }),
    // transporterDate: z.string({ required_error: "Plenter Shipping GSTIN Number" }),
    vehicleType: z.string({ required_error: "Please enter Vehicle Type" }),
    dispatchTo:z.object({
    address1:z.string({ required_error: "Please enter Address Description must be between 3 and 100 characters" }),
    address2:z.string({ required_error: "Please enter Address Description must be between 3 and 100 characters" }),
    // company:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    gstin:  z.string({ required_error: "Please enter GST" }),
    label:z.string({ required_error: "Please enter Name" }),
    pincode:    z.string({ required_error: "Please enter Pincode" }),
    state_code:z.string({ required_error: "Please enter state" }),
    })

});

const eInvoiceSchema2 = z.object({



  supply_type: z.string({ required_error: "Please Select Supply Type" }),
  sub_supply_type:z.string({ required_error: "Please Select Sub Supply Type" }),
  invoice_id:z.string({ required_error: "Please enter Invoice Id" }),
  document_type:z.string({ required_error: "Please select Document Type" }),
  documnet_date:z.string({ required_error: "Please enter Document Date" }),
  dispatch_name:z.string({ required_error: "Please enter Dispatch Name" }),
  dispatchfrom_pan:z.string({ required_error: "Please enter PAN Number" }),
  dispatchfrom_address1 :z.string({ required_error: "Please enter Address and Address must be between 3 and 100 characters" }),
  dispatchfrom_address2:z.string({ required_error: "Please enter Address and Address must be between 3 and 100 characters" }),
  dispatchfrom_gstin:z.string({ required_error: "Please enter GST" }),
  dispatchfrom_place:z.string({ required_error: "Please enter place" }),
  dispatchfrom_state:z.string({ required_error: "Please enter State" }),
  dispatchfrom_pincode:z.string({ required_error: "Please enter Pincode" }),
  shipto_name: z.string({ required_error: "Please select Name" }),
  billToaddress1: z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
  billToaddress2: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
  bill_to_pincode: z.string({ required_error: "Please enter your Pincode" }),
  bill_to_state: z.string().optional(),
  shipto_gstin: z.string({ required_error: "Please enter GST" }),
  shipToAddress2:z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
  shipToAddress1:z.string({ required_error: "Please add your Address. Description must be between 3 and 100 characters" }),
  // shipTo_state_code:z.string({ required_error: "Please enter State" }),
  shipto_pincode: z.string({ required_error: "Please enter Pincode" }),
  transactionType: z.string({ required_error: "Please select Transaction Type" }),
  transporterDocNo: z.string().optional(),
  fromPincode: z.string().optional(),
  toPincode: z.string().optional(),
  transDistance: z.string({required_error: "Please enter Trans Distance" }),
  transMode: z.string().optional(),
  transporterId: z.string().optional(),
  trans_doc_date: z.string().optional(),
  vehicleNo: z.string().optional(),
  transporterName: z.string().optional(),
  vehicleType: z.string().optional(),
  dispatchTo:z.object({
  address1:z.string({ required_error: "Please enter Address Description must be between 3 and 100 characters" }),
  address2:z.string({ required_error: "Please enter Address Description must be between 3 and 100 characters" }),
  gstin:  z.string({ required_error: "Please enter GST" }),
  label:z.string({ required_error: "Please enter Name" }),
  pincode:    z.string({ required_error: "Please enter Pincode" }),
  state_code:z.string({ required_error: "Please enter state" }),
  })

});

const debitNoteSchema = eInvoiceSchema2.extend({
  debit_no: z.string({ required_error: "Please select Note Id" }),
  other_ref: z.string({ required_error: "Please enter Other Reference" }),
  document_date: z.string({ required_error: "Please select Document Date" }),
  documnet_date:z.string().optional(),
})

const creditNoteSchema = eInvoiceSchema2.extend({
  credit_no: z.string({ required_error: "Please select Note Id" }),
  other_ref: z.string({ required_error: "Please enter Other Reference" }),
  document_date: z.string({ required_error: "Please select Document Date" }),
  documnet_date:z.string().optional(),
})


const stateSchema = z.object({
  code: z.string(),
  name: z.string(),
});

const header= z.object({
  documentType: z.string({ required_error: "Document Type is required" }),
  supplyType: z.string({ required_error: "Supply Type is required" }),
  subSupplyType: z.string({ required_error: "Sub Supply Type is required" }),
  documentNo: z.string({ required_error: "Document No is required" }),
  documentDate: z.string({ required_error: "Document Date is required" }),
  transactionType: z.enum(["1", "2", "3", "4"], {
    required_error: "Transaction Type is required",
  }),
  reverseCharge: z.enum(["Y", "N"]).optional(),
  igstOnIntra: z.enum(["Y", "N"]).optional(),
});

const billFrom = z.object({
  gstin: z.string({ required_error: "GSTIN is required" }),
  legalName: z.string({ required_error: "Legal Name is required" }),
  tradeName: z.string().optional(),
  addressLine1: z.string({ required_error: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  location: z.string({ required_error: "Location is required" }),
  state: stateSchema.refine((val) => val.code && val.name, {
    message: "State must contain both code and name",
  }),
  pincode: z.string({ required_error: "Pincode is required" }),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

const billTo = z.object({
  gstin: z.string({ required_error: "GSTIN is required" }),
  legalName: z.string({ required_error: "Legal Name is required" }),
  addressLine1: z.string({ required_error: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  location: z.string({ required_error: "Location is required" }),
  state: stateSchema.refine((val) => val.code && val.name, {
    message: "State must contain both code and name",
  }),
  pincode: z.string({ required_error: "Pincode is required" }),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

const dispatchFrom = z.object({
  legalName: z.string({ required_error: "Legal Name is required" }),
  addressLine1: z.string({ required_error: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  location: z.string({ required_error: "Location is required" }),
  state: stateSchema.refine((val) => val.code && val.name, {
    message: "State must contain both code and name",
  }),
  pincode: z.string({ required_error: "Pincode is required" }),
});

const shipTo = z.object({
  gstin: z.string({ required_error: "GSTIN is required" }),
  legalName: z.string({ required_error: "Legal Name is required" }),
  tradeName: z.string().optional(),
  addressLine1: z.string({ required_error: "Address Line 1 is required" }),
  addressLine2: z.string().optional(),
  location: z.string({ required_error: "Location is required" }),
  state: stateSchema.refine((val) => val.code && val.name, {
    message: "State must contain both code and name",
  }),
  pincode: z.string({ required_error: "Pincode is required" }),
});

const ewaybillDetails = z.object({
  transporterId: z.string().optional(),
  transporterName: z.string().optional(),
  tradeName: z.string().optional(),
  transMode: z.string().optional(),
  transporterDocNo: z.string().optional(),
  transporterDate: z.string().optional(),
  vehicleNo: z.string().optional(),
  vehicleType: z.string().optional(),
  transDistance: z.string({ required_error: "Trans Distance is required" }),
  });

// Main schema
const eInvoiceSchema = z.object({
  header: header,
  billFrom: billFrom,
  billTo: billTo,
  dispatchFrom: dispatchFrom,
  shipTo: shipTo,
  ewaybillDetails: ewaybillDetails
});


  export { supplyTypeOptions, subOptions , docType, transportationMode, vehicleTypeOptions, transactionTypeOptions ,columnDefs,ewayBillSchema ,eInvoiceSchema,debitNoteSchema,creditNoteSchema,reverseOptions};