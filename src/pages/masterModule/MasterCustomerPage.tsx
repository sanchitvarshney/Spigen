import React, { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem,  FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clientFormSchema } from "@/schema/masterModule/customerSchema";
import ReusableTable from "@/components/shared/ReusableTable";
import columnDefs from "@/config/agGrid/mastermodule/CustomerTable";
import { transformCustomerTableData } from "@/helper/TableTransformation";
import ClientActionCellRender from "@/config/agGrid/mastermodule/ClientActionCellRender";
import { Badge } from "@/components/ui/badge";
const MasterCustomerPage: React.FC = () => {
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
  });
  function onSubmit(values: z.infer<typeof clientFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const components = useMemo(
    () => ({
        actionsCellRenderer: ClientActionCellRender,
        statusCellRenderer:(params:any)=>{
            return (
                <Badge className="bg-green-600">{params.data.status}</Badge>
            )
        }
    }),
    []
  );
  return (
    <div className="h-[calc(100vh-50px)] grid grid-cols-[450px_1fr]">
      <div className="h-[calc(100vh-50px)] overflow-y-auto bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-[10px] py-[20px]">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Client Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salesPersonName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Sales Person Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-[10px]">
              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter GST Number" {...field} />
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
                    <FormControl>
                      <Input placeholder="Enter PAN Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-[10px]">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Enter Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Enter Mobile Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Website URL" {...field} />
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
      <div>
        <ReusableTable components={components} heigth="h-[calc(100vh-50px)]" endpoint="/client/getClient" columns={columnDefs} transform={transformCustomerTableData} method="get" />
      </div>
    </div>
  );
};

export default MasterCustomerPage;
