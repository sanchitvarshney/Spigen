import AddSalesOrder from "@/components/shared/AddSalesOrder";
import CreateSalesOrder from "@/components/shared/CreateSalesOrder";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  fetchBillingAddress,
  fetchBillingAddressList,
  fetchClient,
  fetchClientAddressDetail,
  fetchCountries,
  fetchcurrency,
  fetchStates,
} from "@/features/salesmodule/createSalesOrderSlice";
import { createSalesFormSchema } from "@/schema/salesorder/createsalesordeschema";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RowData } from "@/config/agGrid/SalseOrderCreateTableColumns";

const CreateSalesOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tabvalue, setTabvalue] = useState<string>("create");
  // const [data, setData] = useState<any>();
  const [payloadData, setPayloadData] = useState<any>(null);
  const [channel, setChannel] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [rowData, setRowData] = useState<RowData[]>([]);
  // type CreateSalesOrderForm = z.infer<typeof createSalesFormSchema>;
  const data = useSelector((state: RootState) => state.createSalesOrder);
  const form = useForm<z.infer<typeof createSalesFormSchema>>({
    resolver: zodResolver(createSalesFormSchema),
    mode: "onBlur",
  });
  // console.log("formdata", payloadData);

  const handleClientChange = (e: any) => {
    form.setValue("customer", e.value);
    dispatch(fetchClientAddressDetail({ addressID: e.value })).then(
      (response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          const data = response.payload;
          form.setValue("customer_branch", data.label);
          form.setValue("customer_gstin", data.gst);
          form.setValue("place_of_supply", data.state?.label);
          form.setValue("customer_address1", data.addressLine1);
          form.setValue("customer_address2", data.addressLine2);
          form.setValue("shipping_id", data?.shipmentAddress?.Company);
          form.setValue("shipping_pan", data?.shipmentAddress?.Pan);
          form.setValue("shipping_gstin", data?.shipmentAddress?.Gstin);
          form.setValue("shipping_state", data?.shipmentAddress?.State?.value);
          form.setValue("shipping_pinCode", data?.shipmentAddress?.Pin);
          form.setValue("shipping_address1", data?.shipmentAddress?.Address1);
          form.setValue("shipping_address2", data?.shipmentAddress?.Address2);
          form.setValue("bill_from_gst", data.gstin);
          form.setValue("bill_pan", data.pan);
        }
      }
    );
  };

  useEffect(() => {
    channel?.value && form.setValue("channel", channel?.value);
    if (channel?.value) {
      // Ensure dispatch is called with an object containing clientCode
      dispatch(fetchClient({ clientCode: channel.value })).then(
        (response: any) => {
          console.log("Fetch Client Response:", response);
        }
      );
    }
  }, [channel]);

  useEffect(() => {
    dispatch(fetchBillingAddress({ billing_code: "R26331LI" }));
    dispatch(fetchBillingAddressList({ search: "" }));
    dispatch(fetchCountries());
    dispatch(fetchStates());
    dispatch(fetchcurrency());
  }, []);

  return (
    <div>
      <Tabs value={tabvalue} onValueChange={setTabvalue}>
        <TabsContent value="create" className="p-0 m-0">
          <CreateSalesOrder
            setTab={setTabvalue}
            setPayloadData={setPayloadData}
            channel={channel}
            setChannel={setChannel}
            data={data}
            form={form}
            handleClientChange={handleClientChange}
          />
        </TabsContent>
        <TabsContent value="add" className="p-0 m-0">
          <AddSalesOrder
            setTab={setTabvalue}
            payloadData={payloadData}
            form={form}
            rowData={rowData}
            setRowData={setRowData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateSalesOrderPage;
