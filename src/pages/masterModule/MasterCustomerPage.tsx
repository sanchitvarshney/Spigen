import React, { useEffect, useMemo } from "react";
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
import { clientFormSchema } from "@/schema/masterModule/customerSchema";
import ReusableTable from "@/components/shared/ReusableTable";
import columnDefs from "@/config/agGrid/mastermodule/CustomerTable";
import { transformCustomerTableData } from "@/helper/TableTransformation";
import ClientActionCellRender from "@/config/agGrid/mastermodule/ClientActionCellRender";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/store";
import { createClient, fetchchannelList } from "@/features/client/clientSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MasterCustomerPage: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { channelList } = useSelector((state: RootState) => state.client);
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      channel: "",
      clientName: "",
      panNo: "",
      mobileNo: "",
      phone: "",
      email: "",
      website: "",
      salesPersonName: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof clientFormSchema>) => {
    try {
      const resultAction = await dispatch(
        createClient({
          endpoint: "/client/add",
          payload: {
            client_channel: values.channel,
            clientName: values.clientName,
            phone: values.phone||"",
            panNo: values.panNo,
            mobileNo: values.mobileNo,
            email: values.email || "",
            website: values.website || "",
            salesPersonName: values.salesPersonName || "",
          },
        })
      ).unwrap();

      if (resultAction.message) {
        toast({
          title: "Client created successfully",
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
      actionsCellRenderer: ClientActionCellRender,
      statusCellRenderer: (params: any) => {
        return <Badge className="bg-green-600">{params.data.status}</Badge>;
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchchannelList());
  }, []);

  return (
    <div className="h-[calc(100vh-50px)] grid grid-cols-[450px_1fr]">
      <div className="h-[calc(100vh-50px)] overflow-y-auto bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-[10px] py-[20px]"
          >
            <div className="grid grid-cols-1 gap-[10px]">
              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">
                      Channel{" "}
                      <span className="pl-1 text-red-500 font-bold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue("channel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a filter type" />
                        </SelectTrigger>
                        <SelectContent>
                          {channelList.map((item) => (
                            <SelectItem key={item.code} value={item.code}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600">
                    Client Name{" "}
                    <span className="pl-1 text-red-500 font-bold">*</span>
                  </FormLabel>
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
                  <FormLabel className="text-slate-600">
                    Sales Person Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Sales Person Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-[10px]">
              <FormField
                control={form.control}
                name="panNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">
                      PAN Number{" "}
                      <span className="pl-1 text-red-500 font-bold">*</span>
                    </FormLabel>
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
                  <FormLabel className="text-slate-600">Email</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">
                      Phone{" "}
                      
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600">
                      Mobile Number{" "}
                      <span className="pl-1 text-red-500 font-bold">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Mobile Number"
                        {...field}
                      />
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
                  <FormLabel className="text-slate-600">Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-cyan-700 hover:bg-cyan-600 shadow-slate-500"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <ReusableTable
          components={components}
          heigth="h-[calc(100vh-50px)]"
          endpoint="/client/getClient"
          columns={columnDefs}
          transform={transformCustomerTableData}
          method="get"
        />
      </div>
    </div>
  );
};

export default MasterCustomerPage;
