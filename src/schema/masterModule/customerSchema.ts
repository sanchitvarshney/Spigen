import { z } from 'zod';

const clientFormSchema = z.object({
  clientName: z.string().min(1, { message: "Client Name is required" }),
  salesPersonName: z.string().optional(),
  gstNumber: z.string().min(1, { message: "GST Number is required" }),
  panNumber: z.string().min(1, { message: "PAN Number is required" }),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  mobileNumber: z.string().min(1, { message: "Mobile Number is required" }),
  website: z.string().url().optional(),
});

type ClientFormSchema = z.infer<typeof clientFormSchema>;
