import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columnDefs, RowData } from "@/config/agGrid/mastermodule/MasterProductTable";
import { AgGridReact } from "ag-grid-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Select from "react-select";

import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import styled from "styled-components";
const schema = z.object({
  productType: z.enum(["good", "service"]),
  productSku: z.string().min(2, {
    message: "SKU is required",
  }),
  uom: z.string().min(2, {
    message: "UOM is required",
  }), // You can replace z.string() with a more specific validation if needed
  productName: z.string().min(2, {
    message: "Product Name is required",
  }),
});
const languages = [
  { label: "Good", value: "good" },
  { label: "Service", value: "service" },
] as const;
const MasterProductSfgPage: React.FC = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      productType: "good",
      productSku: "",
      productName: "",
      uom: "",
    },
  });
  const [rowData] = useState<RowData[]>([
    // Example data
    { id: 1, productName: "Product A", sku: "SKU001", unit: "Unit A", category: "Category A" },
    // Add more rows as needed
  ]);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Wrapper className="h-[calc(100vh-100px)] bg-[#fff] grid grid-cols-[450px_1fr]">
      <div className="">
        <Card className="border-none shadow-none rounded-0">
          <CardHeader className="p-0 bg-hbg h-[49px] border-b border-slate-300 px-[10px] flex justify-center">
            <CardTitle className="text-slate-600 font-[500]">Add New FG</CardTitle>

          </CardHeader>
          <CardContent>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-[20px] mt-[20px]">
                  <FormField
                    control={form.control}
                    name="productType"
                    render={() => (
                      <FormItem className="flex flex-col w-full">
                        <FormControl>
                          <Select
                            styles={customStyles}
                            placeholder="Product Type"
                            className="border-0 basic-single"
                            classNamePrefix="select border-0"
                            components={{ DropdownIndicator }}
                            isDisabled={false}
                            isLoading={true}
                            isClearable={true}
                            isSearchable={true}
                            name="color"
                            options={[
                              { label: "Good", value: "good" },
                              { label: "Service", value: "service" },
                            ]}
                            onChange={(value: any) => form.setValue("productType", value!.value)}
                            defaultValue={{ label: "Good", value: "good" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-[10px] items-center">
                    <FormField
                      control={form.control}
                      name="productSku"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="uom"
                      render={() => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <Select
                              styles={customStyles}
                              placeholder="UOM"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              isDisabled={false}
                              isLoading={true}
                              isClearable={true}
                              isSearchable={true}
                              name="color"
                              options={languages}
                              onChange={(value: any) => form.setValue("uom", value!.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button type="submit" className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="ag-theme-quartz h-[calc(100vh-100px)]" >
          <AgGridReact rowData={rowData} columnDefs={columnDefs} rowSelection="single" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
     .ag-theme-quartz .ag-cell{
      outline: none;
      border: none;
      padding: 0;
      padding: 0 5px;
      display: flex;
      justify-content: start;
      align-items: center;
  }
`

export default MasterProductSfgPage;
