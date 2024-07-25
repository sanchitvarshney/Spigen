import { z } from "zod";

export const clientFormSchema = z.object({
  clientName: z.string().min(1, { message: "Client Name is required" }),
  salesPersonName: z.string().optional(),
  panNo: z.string().min(1, { message: "PAN Number is required" }),
  email: z.string().email().optional(),
  mobileNo: z.string().min(1, { message: "Mobile Number is required" }),
  website: z.string().url().optional(),
});

export const clientEditFormSchema = z.object({
  vendorName: z.string().min(1, "Vendor Name is required"),
  email: z.string().email("Invalid email address").optional(),
  panNumber: z.string().min(1, "PAN Number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  salePerson: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  clientTDS: z.string().optional(), // Assuming each entry in the array is a string
  clientTCS: z.string().optional(), // Assuming each entry in the array is a string
  active: z.boolean().optional(),
});

export const branchAddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP Code is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  gstNumber: z.string().min(1, "GST Number is required"),
  address: z.string().min(1, "Address is required"),
});

export const updateBranchSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  gst: z.string().min(1, "GST Number is required"),
  pin: z.string().min(1, "Pin is required"),
  phone: z.number().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().min(1, "Address is required"),
  active: z.boolean(),
});
