import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Download, Filter } from "lucide-react";
import styled from "styled-components";
import { DatePicker, Space } from "antd";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchSellRequestList,
  setDateRange,
} from "@/features/salesmodule/SalesSlice";
import { CsvExportModule } from "ag-grid-community";
import { RootState } from "@/store";
import CustomLoadingCellRenderer from "@/config/agGrid/CustomLoadingCellRenderer";
import { columnDefs } from "@/config/agGrid/SalesOrderRegisterTableColumns";
import { useToast } from "@/components/ui/use-toast";
import FullPageLoading from "@/components/shared/FullPageLoading";
import moment from "moment";
import CopyCellRenderer from "@/components/shared/CopyCellRenderer";
import { OverlayNoRowsTemplate } from "@/components/shared/OverlayNoRowsTemplate";

const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
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
  const { toast } = useToast();
  const gridRef = useRef<AgGridReact<any>>(null);
  const [wise, setWise] = useState<string>("DATE");
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data: rowData, loading } = useSelector(
    (state: RootState) => state.sellRequest
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { dateRange, soWise } = formData;

    let dataString = "";
    if (wise === "DATE" && dateRange) {
      const startDate = moment(dateRange[0]).format("DD-MM-YYYY");
      const endDate = moment(dateRange[1]).format("DD-MM-YYYY");
      dataString = `${startDate}-${endDate}`;
      dispatch(setDateRange(dataString as any));
    } else if (wise === "SONO" && soWise) {
      dataString = soWise;
      dispatch(setDateRange(dataString as any));
    }

    try {
      const resultAction = await dispatch(
        fetchSellRequestList({ wise, data: dataString }) as any
      ).unwrap();
      if (resultAction.success) {
        setIsSearchPerformed(true);
        toast({
          title: "Register fetched successfully",
          className: "bg-green-600 text-white items-center",
        });
      } else {
        toast({
          title: resultAction.message || "Failed to Create Product",
          className: "bg-red-600 text-white items-center",
        });
      }
    } catch (error: any) {
      console.error("Failed to fetch sell requests:", error);
      toast({
        title: error.message || "Failed to fetch Product",
        className: "bg-red-600 text-white items-center",
      });
    }
  };

  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);

  const onBtExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  }, []);

  return (
    <Wrapper className="h-[calc(100vh-100px)] grid grid-cols-[350px_1fr]">
      {loading && <FullPageLoading />}
      <div className="bg-[#fff]">
        <div className="h-[49px] border-b border-slate-300 flex items-center gap-[10px] text-slate-600 font-[600] bg-hbg px-[10px]">
          <Filter className="h-[20px] w-[20px]" />
          Filter
        </div>
        <div className="p-[10px]">
          <Select
            onValueChange={(value) => {
              setWise(value);
              if (value === "SONO") {
                form.setValue("dateRange", undefined);
              }
            }}
            defaultValue={wise}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a filter type" />
            </SelectTrigger>

            <SelectContent>
              {wises.map((data) => (
                <SelectItem key={data.value} value={data.value}>
                  {data.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-hidden p-[10px]"
          >
            {wise === "DATE" ? (
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Space direction="vertical" size={12} className="w-full">
                        <RangePicker
                          className="border shadow-sm border-slate-400 py-[7px] hover:border-slate-300 w-full"
                          onChange={(value) =>
                            field.onChange(
                              value ? value.map((date) => date!.toDate()) : []
                            )
                          }
                          format={dateFormat}
                          disabledDate={(current) =>
                            current && current > moment().endOf("day")
                          }
                        />
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
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="SO number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex space-x-2 float-end pr-2">
              {isSearchPerformed && ( // Only show the download button if search is performed
                <Button
                  type="button"
                  onClick={onBtExport}
                  className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500"
                >
                  <Download />
                </Button>
              )}
              <Button
                type="submit"
                className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500"
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="ag-theme-quartz h-[calc(100vh-100px)]">
        <AgGridReact
          loading={loading}
          ref={gridRef}
          modules={[CsvExportModule]}
          loadingCellRenderer={loadingCellRenderer}
          rowData={rowData ? rowData : []}
          columnDefs={columnDefs}
          defaultColDef={{ filter: true, sortable: true }}
          pagination={true}
          paginationPageSize={10}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
          components={{ copyCellRenderer: CopyCellRenderer }}
          overlayNoRowsTemplate={OverlayNoRowsTemplate}
        />
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
