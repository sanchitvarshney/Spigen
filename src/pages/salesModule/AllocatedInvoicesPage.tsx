import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Filter } from "lucide-react";
import {
  columnDefs,
  TruncateCellRenderer,
} from "@/config/agGrid/SalesOrderAllocatedTableColumns";
import styled from "styled-components";
import { DatePicker, Space } from "antd";
import { gridOptions } from "@/config/agGrid/ModuleRegistry";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCreditDebitRegisterList } from "@/features/salesmodule/creditDebitRegister";
import FullPageLoading from "@/components/shared/FullPageLoading";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const types = [
  { label: "Debit Note", value: "debit" },
  { label: "Credit Note", value: "credit" },
] as const;

const FormSchema = z.object({
  dateRange: z
    .array(z.date())
    .length(2)
    .optional()
    .refine((data) => data === undefined || data.length === 2, {
      message: "Please select a valid date range.",
    }),
  type: z.string(),
  wise: z.string().optional(),
});
const AllocatedInvoicesPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: rowData, loading } = useSelector(
    (state: RootState) => state.creditDebitRegister
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "debit", // Set default value for 'wise'
      wise: "date",
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    console.log("Form Data:", formData); // Log form data to check correctness

    const { dateRange, type, wise } = formData;
    let dataString = "";

    if (wise === "date" && dateRange) {
      const startDate = dateRange[0]
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
      const endDate = dateRange[1]
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
      dataString = `${startDate}-${endDate}`;
    } else if (wise === "clientwise") {
      dataString = wise;
    }

    try {
      const resultAction = await dispatch(
        fetchCreditDebitRegisterList({
          wise: wise, // Ensure correct value
          data: dataString,
          noteType: type,
        }) as any
      ).unwrap();

      if (resultAction.success) {
        toast({
          title: "Invoice fetched successfully",
          className: "bg-green-600 text-white items-center",
        });
      } else {
        toast({
          title: resultAction.message || "Failed to fetch invoice",
          className: "bg-red-600 text-white items-center",
        });
      }
    } catch (error: any) {
      toast({
        title: error.message || "Failed to fetch invoice",
        className: "bg-red-600 text-white items-center",
      });
    }
  };

  return (
    <Wrapper className="h-[calc(100vh-100px)] grid grid-cols-[350px_1fr] ">
      {loading && <FullPageLoading />}
      <div className=" bg-[#fff]">
        <div className="h-[49px] border-b border-slate-300 flex items-center gap-[10px] text-slate-600 font-[600] bg-hbg px-[10px]">
          <Filter className="h-[20px] w-[20px]" />
          Filter
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-hidden ] p-[10px]"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col ">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" onClick={() => setOpen(true)}>
                          {field.value
                            ? types.find((type) => type.value === field.value)
                                ?.label
                            : "Select option"}
                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandList>
                            <CommandEmpty>No option found.</CommandEmpty>
                            <CommandGroup>
                              {types.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  onSelect={() => {
                                    form.setValue("type", type.value);
                                    setOpen(false);
                                  }}
                                >
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                  {/* <FormField
                    control={form.control}
                    name="dateRange"
                    render={() => (
                      <FormItem className="w-full ">
                        <FormControl>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                              <AccordionTrigger className="w-full border-none text-slate-600 text-[15px]">
                                Date Wise
                              </AccordionTrigger>
                              <AccordionContent>
                                <Space
                                  direction="vertical"
                                  size={12}
                                  className="w-full"
                                >
                                  <RangePicker
                                    className=" border shadow-sm border-slate-400 py-[7px] hover:border-slate-300 w-full"
                                    onChange={(value) =>
                                      form.setValue(
                                        "dateRange",
                                        value
                                          ? value.map((date) => date!.toDate())
                                          : []
                                      )
                                    }
                                    format={dateFormat}
                                  />
                                </Space>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="dateRange"
                    render={() => (
                      <FormItem className="pl-[10px] w-fulls">
                        <FormControl>
                          <Space direction="vertical" size={12}>
                            <RangePicker
                              className=" border shadow-sm border-slate-400 py-[7px] hover:border-slate-300 w-[310px]"
                              onChange={(value) =>
                                form.setValue(
                                  "dateRange",
                                  value
                                    ? value.map((date) => date!.toDate())
                                    : []
                                )
                              }
                              format={dateFormat}
                            />
                          </Space>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            />
            <Button
              type="submit"
              className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500 "
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="ag-theme-quartz h-[calc(100vh-100px)]">
        <AgGridReact
          gridOptions={gridOptions}
          rowData={rowData as any}
          columnDefs={columnDefs}
          defaultColDef={{ filter: true, sortable: true }}
          pagination={true}
          paginationPageSize={10}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
          components={{ truncateCellRenderer: TruncateCellRenderer }}
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
export default AllocatedInvoicesPage;
