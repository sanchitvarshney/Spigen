import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { branchAddressSchema } from "@/schema/masterModule/customerSchema";
import ReusableAsyncSelect from "./ReusableAsyncSelect";
import { transformPlaceData } from "@/helper/transform";
import { Props } from "@/types/masterModule/masterCustomerTypes";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "../ui/textarea";

const MasterClientBranch: React.FC<Props> = ({ uiState }) => {
  const { clientBranch, setClientBranch } = uiState;
  const form = useForm<z.infer<typeof branchAddressSchema>>({
    resolver: zodResolver(branchAddressSchema),
  });

  const onSubmit = (value: any) => {
    console.log(value)
  };
  return (
    <Sheet open={clientBranch} onOpenChange={setClientBranch}>
      <SheetContent className="min-w-[50%]">
        <SheetHeader>
          <SheetTitle className="text-slate-600">Western Solar Systems (CUS0001)</SheetTitle>
        </SheetHeader>
        <div className="my-[20px]">
          <h3 className="text-[17px] text-slate-600 font-[600]">Branch Address Information</h3>
          <p className="text-[14px]">Please provide client address info</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-[20px]">
                <FormField
                  control={form.control}
                  name="country"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-slate-600">Country</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect placeholder="Country" endpoint="tally/backend/countries" transform={transformPlaceData} fetchOptionWith="query" onChange={(e: any) => form.setValue("country", e.value)} />
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
                        <ReusableAsyncSelect placeholder="State" endpoint="tally/backend/states" transform={transformPlaceData} fetchOptionWith="query" onChange={(e: any) => form.setValue("state", e.value)} />
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
                      <FormLabel className="text-slate-600">City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">ZIP Code</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gstNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600">GST Number</FormLabel>
                      <FormControl>
                        <Input placeholder="GST Number" {...field} />
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
                      <Textarea placeholder="GST Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600 shadow-slate-500">
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
