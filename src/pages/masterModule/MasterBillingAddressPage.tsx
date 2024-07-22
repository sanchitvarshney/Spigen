import CustomTooltip from "@/components/shared/CustomTooltip";
import { Button } from "@/components/ui/button";
import { columnDefs } from "@/config/agGrid/mastermodule/BillingAddressTable";
import { RowData } from "@/types/masterModule/MasterBillingAddressType";
import { AgGridReact } from "ag-grid-react";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import formSchema from "@/schema/masterModule/billingAddress";
import { transformOptionData } from "@/helper/transform";
import ReusableAsyncSelect from "@/components/shared/ReusableAsyncSelect";

const MasterBillingAddressPage: React.FC = () => {
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
      gsn: "123456",
      cin: "L12345MH123456789",
      registerDate: "2023-01-01",
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
      <div className="h-[50px] flex items-center justify-end px-[10px] bg-white">
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
              <SheetTitle className="text-slate-600">Add Billing Address</SheetTitle>
            </SheetHeader>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-[20px]">
                  <div className="grid grid-cols-2 gap-[20px]">
                    <FormField
                      control={form.control}
                      name="warehouseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">Warehouse Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Wearhouse Name" {...field} />
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
                      name="gstNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">GST No.</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter GST Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cinNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600">CIN No</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter CIN Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="selectCity"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-slate-600">CIN No</FormLabel>
                          <FormControl>
                            <ReusableAsyncSelect placeholder="Select City" endpoint="backend/stateList" transform={transformOptionData} onChange={(e: any) => form.setValue("selectCity", e?.value)} fetchOptionWith="payload" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="selectAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Select Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter Complete Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600">Submit</Button>
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

export default MasterBillingAddressPage;
