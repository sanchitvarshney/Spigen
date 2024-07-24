import CustomTooltip from "@/components/shared/CustomTooltip";
import { Button } from "@/components/ui/button";
import { columnDefs } from "@/config/agGrid/mastermodule/ShippingAddressTable";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Download, Plus } from "lucide-react";

import React from "react";

import ReusableTable from "@/components/shared/ReusableTable";
import { transformBillingTable } from "@/helper/TableTransformation";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createShippingAddress } from "@/features/shippingAddress/shippingAdressSlice";


const schema = z.object({
 
  label: z.string().min(2, {
    message: "Label is required",
  }),
  company: z.string().min(2, {
    message: "Company is required",
  }),
  pan: z.string().min(2, {
    message: "Pan is required",
  }),
  state: z.string().min(2, {
    message: "State is required",
  }),
  gstin:z.string().min(2, {
    message: "Pan is required",
  }),
  address:z.string().min(2, {
    message: "Address is required",
  }),
  addressLine1:z.string().min(2, {
    message: "Address is required",
  }),
  addressLine2:z.string().min(2, {
    message: "Address is required",
  }),
 

  
  
});

const MasterShippingAddressPage: React.FC = () => {
  const { toast } = useToast();
  const dispatch=useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:{
      label:"",
      company:"",
      pan:"",
      state:"",
      gstin:"",
      address:"",
      addressLine1:"",
      addressLine2:"",
     


    }
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const resultAction = await dispatch(
        createShippingAddress({
          endpoint: "/shippingAddress/saveShippingAddress",
          payload: {
            label:values.label,
            company:values.company,
            pan:values.pan,
            state:values.state,
            gstin:values.gstin,
            address:values.address,
            addressLine1:values.addressLine1,
            addressLine2:values.addressLine2,
           
          },
        })
      ).unwrap();

      if (resultAction.success) {
        toast({
          title: "Shipping Address created successfully",
          className: "bg-green-600 text-white items-center",
        });
     
       
      } else {
        toast({
          title: resultAction.message || "Failed to Create Product",
          className: "bg-red-600 text-white items-center",
        });
       
      
      }
    } catch (error) {

      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="h-[50px] flex items-center justify-end px-[10px] bg-white gap-[10px]">
        <CustomTooltip message="Download Excel Report" side="top" className="bg-yellow-700">
          <Button className="bg-cyan-700 hover:bg-cyan-600 p-0 h-[30px] w-[30px] flex justify-center items-center shadow-slate-500">
            <Download className="h-[20px] w-[20px]" />
          </Button>
        </CustomTooltip>
        <Sheet>
          <SheetTrigger>
            <CustomTooltip message="Add Address" side="top" className="bg-yellow-700">
              <Button className="bg-cyan-700 hover:bg-cyan-600 p-0 h-[30px] w-[30px] flex justify-center items-center shadow-slate-500">
                <Plus className="h-[20px] w-[20px]" />
              </Button>
            </CustomTooltip>
          </SheetTrigger>
          <SheetContent className="min-w-[50%]">
            <SheetHeader>
              <SheetTitle className="text-slate-600">Add Shipping Address</SheetTitle>
            </SheetHeader>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-[20px]">
                  <div className="grid grid-cols-2 gap-[20px]">
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">Address label</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Address Lable" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">Pan No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Pan Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">GSTIN</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter GSTIN Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">State</FormLabel>
                          <FormControl>
                          <Input placeholder="Enter State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter Complete Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Address Line 1</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter Complete Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                 <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Address Line 2</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter Complete Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="ag-theme-quartz h-[calc(100vh-150px)]">
      <ReusableTable
          heigth="h-[calc(100vh-100px)]"
          endpoint="/shippingAddress/getAll"
          columns={columnDefs}
          transform={transformBillingTable}
          method="get"
        />
      </div>
    </div>
  );
};

export default MasterShippingAddressPage;
