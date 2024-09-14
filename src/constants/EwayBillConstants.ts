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
      label: "Outward",
      value: "O",
    },
    {
      label: "Inward",
      value: "I",
    },
  ];
  
  const subOptions = [
    { value: "1", label: "Supply" },
    { value: "2", label: "Import" },
    { value: "3", label: "Export" },
    { value: "4", label: "Job Work" },
    { value: "5", label: "For Own Use" },
    { value: "6", label: "Job Work Return" },
    { value: "7", label: "Sale Return" },
    { value: "8", label: "Others" },
    { value: "9", label: "SKD/CKD/Lots" },
    { value: "10", label: "Line Sales" },
    { value: "11", label: "Recipient Not Known" },
    { value: "12", label: "Exhibition or Fairs" },
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
    dispatch_name:z.string({ required_error: "Please enter Dispatch Name" }),
    dispatchfrom_address1 :z.string({ required_error: "Please enter Address" }),
    dispatchfrom_address2:z.string({ required_error: "Please enter PO number" }),
    dispatchfrom_gstin:z.string({ required_error: "Please enter Vendor Code" }),
    dispatchfrom_place:z.string({ required_error: "Please provide place of supply" }),
    dispatchfrom_state:z.string({ required_error: "Please add your Billing Address Description must be between 10 and 100 characters" }),
    dispatchfrom_pincode:z.string({ required_error: "Please add your Billing Address Description must be between 10 and 100 characters" }),
    shipto_name: z.string({ required_error: "Please select client Name" }),
    shipto_address: z.string({ required_error: "Please provide GST" }),
    shipto_gstin: z.string({ required_error: "" }),
    shipToAddress2:z.string({ required_error: "Please provide GST" }),
    shipToAddress1:z.string({ required_error: "Please provide GST" }),
    shipto_place:z.string(),
    shipTo_state_code:z.string({ required_error: "Please select Vendor Branch" }),
    dispatchfrom_pan:z.string({ required_error: "Please enter Billing PAN Number" }),
    bill_to_state: z.string().optional(),
    shipto_pincode: z.string({ required_error: "Please select Vendor Branch" }),
    transporter_id: z.string({ required_error: "Please select Billing Address" }),
    transporter_name: z.string({ required_error: "" }),
    billToaddress1: z.string({ required_error: "Please select Shipping Address" }),
    billToaddress2: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    bill_to_pincode: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    transactionType: z.string({ required_error: "Please select Shipping State" }),
    transporterDocNo: z.string({ required_error: "" }),
    fromPincode: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    toPincode: z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    transDistance: z.string().optional(),
    transMode: z.string().optional(),
    transporterId: z.string().optional(),
    vehicleNo: z.string({ required_error: "Plenter Shipping Pincode" }),
    transporterName: z.string({ required_error: "Plenter Shipping PAN Number" }),
    transporterDate: z.string({ required_error: "Plenter Shipping GSTIN Number" }),
    vehicleType: z.string({ required_error: "" }),
    dispatchTo:z.object({
    address1:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    address2:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    company:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    gstin:  z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    label:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    pincode:    z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    state_code:z.string({ required_error: "Please add your Shipping Address Description must be between 10 and 100 characters" }),
    })

});


  export { supplyTypeOptions, subOptions , docType, transportationMode, vehicleTypeOptions, transactionTypeOptions ,columnDefs,ewayBillSchema };