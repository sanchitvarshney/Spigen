import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent,SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Edit2, Eye, Image, Upload } from "lucide-react";
import { z } from "zod";
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Select from "react-select";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { Textarea } from "@/components/ui/textarea"

const productSchema = z.object({
  productName: z.string().min(1, "Product Name is required"),
  uom: z.string().min(1, "UoM is required"),
  productCategory: z.string().min(1, "Product Category is required"),
  category: z.string().min(1, "Category is required"),
  mrp: z.number().min(0, "MRP must be a positive number"),
  type: z.string().min(0, "Type is required"),
  enabled: z.boolean(),
  description: z.string().optional(),
  taxType: z.number().min(0, "Tax Type must be a positive number"),
  gstRate: z.number().min(0, "GST Rate must be a positive number"),
  hsn: z.string().optional(),
  brand: z.string().optional(),
  ean: z.string().optional(),
  weight: z.number().min(0, "Weight must be a positive number").optional(),
  volumetricWeight: z.number().min(0, "Volumetric Weight must be a positive number").optional(),
  height: z.number().min(0, "Height must be a positive number").optional(),
  width: z.number().min(0, "Width must be a positive number").optional(),
  minStockFg: z.number().min(0, "MIN Stock (FG) must be a positive number"),
  minStockRm: z.number().min(0, "MIN Stock (RM) must be a positive number").optional(),
  mfgBatchSize: z.number().min(0, "MFG Batch Size must be a positive number"),
  defaultStockLocation: z.string().optional(),
  labourCost: z.number().min(0, "Labour Cost must be a positive number"),
  secPackingCost: z.number().min(0, "Sec Packing Cost must be a positive number"),
  jwCost: z.number().min(0, "JW Cost must be a positive number"),
  otherCost: z.number().min(0, "Other Cost must be a positive number"),
});
const ActionCellRender = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
    },
  });
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex items-center gap-[10px]">
      <Sheet>
        <SheetTrigger>
          <Edit2 className="text-cyan-700 h-[20px] w-[20px]" />
        </SheetTrigger>
        <SheetContent className="min-w-[60%] p-0">
          <SheetHeader className="p-0 h-[50px]  px-[10px] justify-center text-slate-600 shadow">
            <SheetTitle>Updating: Oakmist 5 Ltr</SheetTitle>
          </SheetHeader>
          <div className="mt-[2px] px-[10px] py-[20px] h-[calc(100vh-50px)] overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="border rounded-md shadow-sm">
                  <CardHeader className="h-[50px] p-0 px-[10px] flex justify-center bg-hbg">
                    <CardTitle className="font-[500] text-slate-600">Basic Details</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-[20px] px-[10px]">
                    <div className="grid grid-cols-3 gap-[30px] items-center ">
                      <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Label</FormLabel>
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
                          <FormItem className="flex flex-col w-full">
                              <FormLabel className=" text-slate-600 ml-[10px]">Label</FormLabel>
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
                                onChange={(value: any) => form.setValue("uom", value!.value)}
                                defaultValue={{ label: "Good", value: "good" }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="productCategory"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">productCategory</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={() => (
                          <FormItem className="flex flex-col w-full">
                              <FormLabel className=" text-slate-600 ml-[10px]">Category</FormLabel>
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
                                onChange={(value: any) => form.setValue("category", value!.value)}
                                defaultValue={{ label: "Good", value: "good" }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mrp"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">MRP</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={() => (
                          <FormItem className="flex flex-col w-full">
                              <FormLabel className=" text-slate-600 ml-[10px]">Type</FormLabel>
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
                                onChange={(value: any) => form.setValue("type", value!.value)}
                                defaultValue={{ label: "Good", value: "good" }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="enabled"
                        render={() => (
                          <FormItem className="flex flex-col w-full">
                              <FormLabel className=" text-slate-600 ml-[10px]">Enabled</FormLabel>
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
                                  { label: "Good", value: true },
                                  { label: "Service", value: false },
                                ]}
                                onChange={(value: any) => form.setValue("enabled", value!.value)}
                                defaultValue={{ label: "Good", value: true }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="mt-[30px]">
                              <FormLabel className=" text-slate-600 ml-[10px]">Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="shadcn" {...field} className=" border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </CardContent>
                </Card>
                <Card className="border rounded-md shadow-sm">
                  <CardHeader className="h-[50px] p-0 px-[10px] flex justify-center bg-hbg">
                    <CardTitle className="font-[500] text-slate-600">Tax Details</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-[20px] px-[10px]">
                    <div className="grid grid-cols-3 gap-[30px] items-center ">
                     
                      <FormField
                        control={form.control}
                        name="taxType"
                        render={() => (
                          <FormItem className="flex flex-col w-full">
                              <FormLabel className=" text-slate-600 ml-[10px]">Tax Type</FormLabel>
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
                                onChange={(value: any) => form.setValue("taxType", value!.value)}
                                defaultValue={{ label: "Good", value: "good" }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gstRate"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">GST Rate</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="hsn"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">HSN</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border rounded-md shadow-sm">
                  <CardHeader className="h-[50px] p-0 px-[10px] flex justify-center bg-hbg">
                    <CardTitle className="font-[500] text-slate-600">Advance Details</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-[20px] px-[10px]">
                    <div className="grid grid-cols-3 gap-[30px] items-center ">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Brand</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="ean"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">EAN</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Weight</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                        <FormField
                        control={form.control}
                        name="volumetricWeight"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Volumetric Weight</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Height</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Width</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border rounded-md shadow-sm">
                  <CardHeader className="h-[50px] p-0 px-[10px] flex justify-center bg-hbg">
                    <CardTitle className="font-[500] text-slate-600">Advance Details</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-[20px] px-[10px]">
                    <div className="grid grid-cols-3 gap-[30px] items-center ">
                      <FormField
                        control={form.control}
                        name="minStockFg"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">MIN Stock (FG)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="minStockRm"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">MIN Stock(RM)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="mfgBatchSize"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">MFG Batch Size</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="shadcn" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                         <FormField
                        control={form.control}
                        name="defaultStockLocation"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Default Stock Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Default Stock Location" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="labourCost"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Labour Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Labour Cost" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="secPackingCost"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Sec Packing Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Sec Packing Cost" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="jwCost"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">JW Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="JW Cost" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="otherCost"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel className=" text-slate-600 ml-[10px]">Other Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Other Cost" {...field} className="border-0 border-b rounded-none shadow-none placeholder:text-neutral-500 text-[15px] border-slate-600 focus:outline-none focus:ring-0 focus-visible:ring-0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger>
          <Eye className="text-cyan-700 h-[20px] w-[20px]" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Oakmist Plus</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full">
            <Image className="text-slate-300 h-[50px] w-[50px]" />
            <p className="text-slate-500 mt-[20px]">No image found</p>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger>
          <Upload className="text-cyan-700 h-[20px] w-[20px]" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-slate-600">Oakmist Plus</SheetTitle>
          </SheetHeader>
          <div className="mt-[20px] flex flex-col gap-[20px]">
            <Input placeholder="Lable" className="border-slate-400" />
            <Label htmlFor="image" className="flex items-center justify-center border border-dashed border-slate-400 shadow h-[150px] rounded-md flex-col">
              <Image className="text-slate-300 h-[50px] w-[50px]" />
              <p className="text-slate-500 mt-[20px]">Select images to upload for this product.</p>
              <Input id="image" type="file" className="hidden" />
            </Label>
            <Button className="bg-cyan-700 hover:bg-cyan-600">Submit</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ActionCellRender;
