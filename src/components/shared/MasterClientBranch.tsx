import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { branchAddressSchema } from "@/schema/masterModule/customerSchema";
import ReusableAsyncSelect from "./ReusableAsyncSelect";
import { transformPlaceData } from "@/helper/transform";
import { Props } from "@/types/masterModule/masterCustomerTypes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch } from "@/store";
import { createBranch } from "@/features/client/branchSlice";
import { InputStyle, LableStyle } from "@/constants/themeContants";

const MasterClientBranch: React.FC<Props> = ({ uiState }) => {
  const { clientBranch, setClientBranch, params } = uiState;
  const clientId = params?.data?.clientID;

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof branchAddressSchema>>({
    resolver: zodResolver(branchAddressSchema),
    defaultValues: {
      state: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      pinCode: "",
      phoneNo: "",
      gst: "",
      useAsShipmentAddress: false,
    },
  });
  console.log(params);
  const onSubmit = async (values: z.infer<typeof branchAddressSchema>) => {
    console.log(values, "val");
    try {
      const resultAction = await dispatch(
        createBranch({
          endpoint: "/client/addBranch",
          payload: {
            ...values,
            clientCode: clientId,
          },
        })
      ).unwrap();

      if (resultAction.message) {
        toast({
          title: "Branch created successfully",
          className: "bg-green-600 text-white items-center",
        });
      } else {
        toast({
          title: resultAction.message || "Failed to Create Branch",
          className: "bg-red-600 text-white items-center",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  console.log(form.getValues());
  return (
    <Sheet open={clientBranch} onOpenChange={setClientBranch}>
      <SheetContent className="min-w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-slate-600">
            {params?.data?.name} ({clientId})
          </SheetTitle>
        </SheetHeader>
        <div className="my-[20px]">
          <h3 className="text-[17px] text-slate-600 font-[600]">
            Bill To Information
          </h3>
          <p className="text-[14px]">Please provide Bill To address info</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-4 gap-[20px]">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Lable/Wharehouse/FC Code/DC{" "}
                        <span className="pl-1 text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          placeholder="Lable/Wharehouse/FC Code/DC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={() => (
                    <FormItem>
                      <FormLabel className={LableStyle}>Country</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect
                          placeholder="Country"
                          endpoint="tally/backend/countries"
                          transform={transformPlaceData}
                          fetchOptionWith="query"
                          onChange={(e: any) =>
                            form.setValue("country", e.value)
                          }
                        />
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
                      <FormLabel className={LableStyle}>State</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect
                          placeholder="State"
                          endpoint="tally/backend/states"
                          transform={transformPlaceData}
                          fetchOptionWith="query"
                          onChange={(e: any) => form.setValue("state", e.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>City</FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          placeholder="City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>ZIP Code</FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          type="number"
                          placeholder="ZIP Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          type="number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>GST Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GST Number"
                          {...field}
                          className={InputStyle}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-[20px]">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Address Line 1
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className={InputStyle}
                          placeholder="Address Line 1"
                          {...field}
                        />
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
                      <FormLabel className={LableStyle}>
                        Address Line 2
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className={InputStyle}
                          placeholder="Address Line 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="border-b-[1px] border-slate-300"></div>
              <div className="my-[20px]">
                <h3 className="text-[17px] text-slate-600 font-[600]">
                  Map Ship Address
                </h3>
                <p className="text-[14px]">Same as Bill To</p>
              </div>
              <div className="grid grid-cols-4 gap-[20px]">
                <FormField
                  control={form.control}
                  name="shipmentAddress.label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Lable/Wharehouse/FC Code/DC{" "}
                        <span className="pl-1 text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          placeholder="Lable/Wharehouse/FC Code/DC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Company
                        <span className="pl-1 text-red-500 font-bold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          placeholder="Company"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.country"
                  render={() => (
                    <FormItem>
                      <FormLabel className={LableStyle}>Country</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect
                          placeholder="Country"
                          endpoint="tally/backend/countries"
                          transform={transformPlaceData}
                          fetchOptionWith="query"
                          onChange={(e: any) =>
                            form.setValue("shipmentAddress.country", e.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.state"
                  render={() => (
                    <FormItem>
                      <FormLabel className={LableStyle}>State</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect
                          placeholder="State"
                          endpoint="tally/backend/states"
                          transform={transformPlaceData}
                          fetchOptionWith="query"
                          onChange={(e: any) =>
                            form.setValue("shipmentAddress.state", e.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>ZIP Code</FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          type="number"
                          placeholder="ZIP Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.gst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>GST Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GST Number"
                          {...field}
                          className={InputStyle}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>PAN Number</FormLabel>
                      <FormControl>
                        <Input
                          className={InputStyle}
                          placeholder="PAN Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-[20px]">
                <FormField
                  control={form.control}
                  name="shipmentAddress.addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Address Line 1
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className={InputStyle}
                          placeholder="Address Line 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipmentAddress.addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={LableStyle}>
                        Address Line 2
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className={InputStyle}
                          placeholder="Address Line 2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="bg-cyan-700 hover:bg-cyan-600 shadow-slate-500"
                onClick={() => onSubmit(form.getValues())}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MasterClientBranch;
