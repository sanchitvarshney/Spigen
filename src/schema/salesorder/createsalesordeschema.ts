import { z } from "zod";

// Define schema for "headers" with custom error messages
const createSalesFormSchema = z.object({
  channels: z.string(),
  fba_shipment_id:z.string(),
  fba_appointment_id:z.string(),
  hawb_number:z.string(),
  consignment_id:z.string(),
  po_number:z.string(),
  blkt_vendor_code:z.string(),
  order_id:z.string(),
  place_of_supply:z.string(),
  customer_address1:z.string(),
  customer_address2:z.string(),
  customer: z.string(),
  customer_gstin: z.string(),
  bill_to_label: z.string(),
  project: z.string(),
  cost_center: z.string(),
  delivery_term: z.string(),
  payment_term: z.string().optional(),
  comment: z.string(),
  customer_branch: z.string(),
  customer_address: z.string(),
  bill_id: z.string(),
  billing_address: z.string(),
  shipping_id: z.string(),
  shipping_address1: z.string(),
  shipping_address2: z.string(),
  shipping_state: z.string(),
  isSameClientAdd: z.string(),
  due_day: z.string().optional(),
  terms_condition: z.string().optional(),
  quotation_detail: z.string().optional(),
  shipping_pinCode: z.string(),
  shipping_pan: z.string(),
  shipping_gstin: z.string(),
  dispatch_pincode: z.string(),
  pan: z.string(),
  dispatch_gstin_uin: z.string(),
  dispatch_address: z.string(),
  // bill_from_address: z.string(),
  bill_pan: z.string(),
  bill_from_gst: z.string(),
  billing_address1: z.string(),
  billing_address2: z.string(),
  project_id: z.string(),
  project_description: z.string(),
  // bill_to_gst: z.string(),
  company:z.string(),
  gstin:z.string(),
  address:z.string(),
  statecode:z.string(),



});

// Define schema for "materials" with custom error messages
const materialsSchema = z.object({
  so_type: z.array(z.string()).min(1, { message: "At least one SO Type is required" }),
  items: z.array(z.string()).optional().nullable(),
  qty: z.array(z.number()).optional().nullable(),
  hsn: z.array(z.string()).optional().nullable(),
  price: z.array(z.number()).optional().nullable(),
  gst_rate: z.array(z.number()).optional().nullable(),
  gst_type: z.array(z.string()).optional().nullable(),
  currency: z.array(z.string()).optional().nullable(),
  exchange_rate: z.array(z.number()).optional().nullable(),
  due_date: z.array(z.string()).optional().nullable(), // Ensure format validation as needed
  remark: z.array(z.string()).optional().nullable(),
});


export { createSalesFormSchema, materialsSchema };
