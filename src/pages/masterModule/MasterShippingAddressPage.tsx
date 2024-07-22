import CustomTooltip from "@/components/shared/CustomTooltip";
import { Button } from "@/components/ui/button";
import { columnDefs } from "@/config/agGrid/mastermodule/ShippingAddressTable";
import { RowData } from "@/types/masterModule/MasterShippingAddressType";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AgGridReact } from "ag-grid-react";
import { Download, Plus } from "lucide-react";

import React, { useState } from "react";
import { formSchema } from "@/schema/masterModule/ShippingAddress";
import { transformOptionData } from "@/helper/transform";
import ReusableAsyncSelect from "@/components/shared/ReusableAsyncSelect";

const MasterShippingAddressPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [rowData] = useState<RowData[]>([
    // Example row data
    {
      label: "Sample Label",
      company: "Sample Company",
      state: "Sample State",
      panNo: "ABCP1234E",
      gst: "123456",
      srno: 0,
    },
    // Add more rows as needed
  ]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
                      name="addressLabel"
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
                      name="companyName"
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
                      name="panNo"
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
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-slate-600">State</FormLabel>
                          <FormControl>
                            <ReusableAsyncSelect placeholder="Select State" endpoint="backend/stateList" transform={transformOptionData} onChange={(e: any) => form.setValue("state", e?.value)} fetchOptionWith="payload" />
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
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true,
            resizable: true,
          }}
        />
      </div>
    </div>
  );
};

export default MasterShippingAddressPage;
