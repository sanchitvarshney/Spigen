import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Filter } from "lucide-react";
import styled from "styled-components";
import { DatePicker, Space } from "antd";
import {  RowData } from "@/types/SalesOrderRegisterType";
import { columnDefs } from "@/config/agGrid/SalesOrderRegisterTableColumns";
import { gridOptions } from "@/config/agGrid/ModuleRegistry";
import CustomLoadingCellRenderer from "@/config/agGrid/CustomLoadingCellRenderer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const wises = [
  { label: "Date Wise", value: "DATE" },
  { label: "SO(s)Wise", value: "SONO" },
] as const;

const FormSchema = z.object({
  dateRange: z
    .array(z.date())
    .length(2)
    .optional()
    .refine((data) => data === undefined || data.length === 2, {
      message: "Please select a valid date range.",
    }),
  soWise: z.string().optional(),
});

const RegisterSalesOrderPage: React.FC = () => {
  const [rowData, setRowData] = React.useState<RowData[] | null>(null);
  const [wise, setWise] = useState<string>("DATE");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }
  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);
  
  
  return (
    <Wrapper className="h-[calc(100vh-100px)] grid grid-cols-[350px_1fr] ">
      <div className=" bg-[#fff]">
        <div className="h-[49px] border-b border-slate-300 flex items-center gap-[10px] text-slate-600 font-[600] bg-hbg px-[10px]">
          <Filter className="h-[20px] w-[20px]" />
          Filter
        </div>
      <div className="p-[10px]">
      <Select onValueChange={(value) => setWise(value)} defaultValue={wise}>
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>

          <SelectContent>
            {wises.map((data) => (
              <SelectItem value={data.value}>{data.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 overflow-hidden p-[10px]">
            {wise === "DATE" ? (
              <FormField
                control={form.control}
                name="dateRange"
                render={() => (
                  <FormItem className="w-full ">
                    <FormControl>
                      <Space direction="vertical" size={12} className="w-full">
                        <RangePicker className=" border shadow-sm border-slate-400 py-[7px] hover:border-slate-300 w-full" onChange={(value) => form.setValue("dateRange", value ? value.map((date) => date!.toDate()) : [])} format={dateFormat} />
                      </Space>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="soWise"
                render={() => (
                  <FormItem className="w-full ">
                    <FormControl>
                      <Input onChange={(e: any) => form.setValue("soWise", e.target.value)} placeholder="Invoice number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500 ">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="ag-theme-quartz h-[calc(100vh-100px)]">
        <AgGridReact   loadingCellRenderer={loadingCellRenderer} rowData={rowData}   columnDefs={columnDefs} defaultColDef={{ filter: true, sortable: true }} pagination={true} paginationPageSize={10} paginationAutoPageSize={true}/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ag-theme-quartz .ag-root-wrapper {
    border-top: 0;
    border-bottom: 0;
  }
`;

export default RegisterSalesOrderPage;
