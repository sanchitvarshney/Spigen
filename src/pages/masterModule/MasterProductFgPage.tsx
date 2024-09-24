import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store"; // Import the type for your AppDispatch
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  columnDefs,
  TruncateCellRenderer,
} from "@/config/agGrid/mastermodule/MasterProductTable";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import ReusableTable from "@/components/shared/ReusableTable";
import { transformProductTable } from "@/helper/TableTransformation";
import { createProduct } from "@/features/product/productSlice";
import { useToast } from "@/components/ui/use-toast";
import { LableStyle } from "@/constants/themeContants";
import ReusableAsyncSelect from "@/components/shared/ReusableAsyncSelect";
import { transformUomData } from "@/helper/transform";

const schema = z.object({
  productType: z.enum(["good", "service"]),
  productSku: z.string().min(2, {
    message: "SKU is required",
  }),
  hsncode: z.string({ required_error: "HSN Code is required" }),
  uom: z.string().min(2, {
    message: "UOM is required",
  }),
  p_croma_code: z.string().optional(),
  productName: z.string().min(2, {
    message: "Product Name is required",
  }),
  p_asin: z.string().min(2, {
    message: "asin is required",
  }),
  p_fnsku: z.string().min(2, {
    message: "fnsku is required",
  }),
  p_item_code: z.string().min(2, {
    message: "item code  is required",
  }),
  p_fsnid: z.string().min(2, {
    message: "fsnid is required",
  }),
});

const languages = [
  { label: "Good", value: "good" },
  { label: "Service", value: "service" },
] as const;

const MasterProductFgPage: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      productType: "good",
      productSku: "",
      productName: "",
      uom: "",
      p_asin: "",
      p_fnsku: "",
      p_item_code: "",
      p_fsnid: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const resultAction = await dispatch(
        createProduct({
          endpoint: "/products/insertProduct",
          payload: {
            p_name: values.productName,
            p_sku: values.productSku,
            units_id: values.uom,
            p_asin: values.p_asin,
            p_fnsku: values.p_fnsku,
            p_item_code: values.p_item_code,
            p_fsnid: values.p_fsnid,
            hsncode: values.hsncode,
            p_croma_code: values.p_croma_code,
          },
        })
      ).unwrap();

      if (resultAction.success) {
        toast({
          title: "Product created successfully",
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

  const components = useMemo(
    () => ({
      truncateCellRenderer: TruncateCellRenderer,
    }),
    []
  );

  return (
    <div className="h-[calc(100vh-100px)] bg-[#fff] grid grid-cols-[450px_1fr]">
      <div>
        <Card className="border-none shadow-none rounded-0">
          <CardHeader className="p-0 bg-hbg h-[49px] border-b border-slate-300 px-[10px] flex justify-center">
            <CardTitle className="text-slate-600 font-[500]">
              Add New FG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 flex flex-col gap-[20px] mt-[20px]"
                >
                  <div className="grid grid-cols-2 gap-[10px] items-center">
                    <FormField
                      control={form.control}
                      name="productType"
                      render={() => (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel className={LableStyle}>
                            Product Type
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              styles={customStyles}
                              placeholder="Product Type"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              isDisabled={false}
                              isLoading={false}
                              isClearable={true}
                              isSearchable={true}
                              options={languages}
                              onChange={(value: any) =>
                                form.setValue("productType", value!.value)
                              }
                              defaultValue={{ label: "Good", value: "good" }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="productSku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Product SKU
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SKU"
                              {...field}
                              className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-[10px] items-center">
                    <FormField
                      control={form.control}
                      name="hsncode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            HSN Code
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="item code"
                              {...field}
                              className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="uom"
                      render={() => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            UOM{" "}
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <ReusableAsyncSelect
                              placeholder="UOM"
                              endpoint="/uom"
                              transform={transformUomData}
                              fetchOptionWith="query"
                              onChange={(e: any) =>
                                form.setValue("uom", e.value)
                              }
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
                        <FormLabel className={LableStyle}>
                          Product Name
                          <span className="pl-1 text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Name"
                            {...field}
                            className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-[10px] items-center">
                    {" "}
                    <FormField
                      control={form.control}
                      name="p_item_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Item Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="item code"
                              {...field}
                              className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="p_fsnid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>FSNID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FSNID"
                              {...field}
                              className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-[10px] items-center">
                    {" "}
                    <FormField
                      control={form.control}
                      name="p_croma_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Croma Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="croma code"
                              {...field}
                              className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="p_fnsku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>FNSKU</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FNSKU"
                              {...field}
                              className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="p_asin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LableStyle}>
                          ASIN Number
                          <span className="pl-1 text-red-500 font-bold">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ASIN"
                            {...field}
                            className="placeholder:text-neutral-500 text-[15px] border-0 border-b rounded-none shadow-none border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button
                      type="submit"
                      className="shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-[calc(100vh-100px)]">
        <ReusableTable
          heigth="h-[calc(100vh-100px)]"
          endpoint="products"
          components={components}
          columns={columnDefs}
          transform={transformProductTable}
          method="get"
        />
      </div>
    </div>
  );
};

export default MasterProductFgPage;
