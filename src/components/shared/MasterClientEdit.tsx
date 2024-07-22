import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientEditFormSchema } from "@/schema/masterModule/customerSchema";
import ReusableAsyncSelect from "./ReusableAsyncSelect";
import { transformClientTds } from "@/helper/transform";
import { Props } from "@/types/masterModule/masterCustomerTypes";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import styled from "styled-components";
const MasterClientEdit: React.FC<Props> = ({ uiState }) => {
  const { clientEdit, setClientEdit } = uiState;
  const form = useForm<z.infer<typeof clientEditFormSchema>>({
    resolver: zodResolver(clientEditFormSchema),
    defaultValues: {
      active: false,
    },
  });

  const onSubmit = (value: any) => {
   console.log(value)
  };
  return (
    <Sheet open={clientEdit} onOpenChange={setClientEdit}>
      <SheetContent className="min-w-[50%]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-[10px]">
                  <FormField
                    control={form.control}
                    name="vendorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Vendor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Vendor Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">PAN Number</FormLabel>
                        <FormControl>
                          <Input placeholder="PAN Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Mobile</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Mobile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salePerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Sale Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Sale Person" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="clientTDS"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-slate-600">Client TDS</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect placeholder="Client TDS" endpoint="vendor/getAllTds" transform={transformClientTds} fetchOptionWith="query" onChange={(e: any) => form.setValue("clientTDS", e.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientTCS"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-slate-600">Client TCS</FormLabel>
                      <FormControl>
                        <ReusableAsyncSelect placeholder="Client TCS" endpoint="/tally/tcs/getAllTcs" transform={transformClientTds} fetchOptionWith="query" onChange={(e: any) => form.setValue("clientTCS", e.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="active"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Switch className="flex items-center gap-[10px]">
                          <label className="switch">
                            <input type="checkbox" checked={field.value} onChange={(e: any) => form.setValue("active",e.target.checked)} />
                            <span className="slider"></span>
                          </label>
                          <p className="text-slate-600 text-[13px]">Active</p>
                        </Switch>
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
const Switch = styled.div`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 2.8em;
    height: 18px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    border-radius: 20px;
    left: 2px;
    bottom: 1.5px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #0891b2;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #0891b2;
  }

  input:checked + .slider:before {
    transform: translateX(1.7em);
  }
`;

export default MasterClientEdit;
