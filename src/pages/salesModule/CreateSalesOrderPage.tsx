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
import { ChannelType } from "@/types/createSalesOrderTypes";
import { useParams } from "react-router-dom";
import { fetchDataForUpdate } from "@/features/salesmodule/SalesSlice";

const CreateSalesOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const pathname = window.location.pathname;
  const [tabvalue, setTabvalue] = useState<string>("create");
  const [payloadData, setPayloadData] = useState<any>(null);
  const [channel, setChannel] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const data = useSelector((state: RootState) => state.createSalesOrder);
  const updateData= useSelector((state: RootState) => state);
  console.log(updateData,"dd")
  const form = useForm<z.infer<typeof createSalesFormSchema>>({
    resolver: zodResolver(createSalesFormSchema),
    mode: "onBlur",
  });

  const handleClientChange = (e: any) => {
    form.setValue("customer", e.value, { shouldValidate: true, shouldDirty: true });
    dispatch(fetchClientAddressDetail({ addressID: e.value })).then(
      (response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          const data = response.payload;
          form.setValue("customer_branch", data.label, { shouldValidate: true, shouldDirty: true });
          form.setValue("customer_gstin", data.gst, { shouldValidate: true, shouldDirty: true });
          form.setValue("place_of_supply", data.state?.label, { shouldValidate: true, shouldDirty: true });
          form.setValue("customer_address1", data.addressLine1, { shouldValidate: true, shouldDirty: true });
          form.setValue("customer_address2", data.addressLine2, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_id", data?.shipmentAddress?.Company, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_pan", data?.shipmentAddress?.Pan, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_gstin", data?.shipmentAddress?.Gstin, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_state", data?.shipmentAddress?.State?.value, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_pinCode", data?.shipmentAddress?.Pin, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_address1", data?.shipmentAddress?.Address1, { shouldValidate: true, shouldDirty: true });
          form.setValue("shipping_address2", data?.shipmentAddress?.Address2, { shouldValidate: true, shouldDirty: true });
          form.setValue("bill_from_gst", data?.gst, { shouldValidate: true, shouldDirty: true });
          form.setValue("bill_pan", data.pan, { shouldValidate: true, shouldDirty: true });
        }
      }
    );
  };

useEffect(() => {
  if (pathname?.includes("update") && params?.id) {
    const soId = (params.id as string).replace(/_/g, "/");
    dispatch(fetchDataForUpdate({ clientCode: soId }));
  }
}, [pathname,params]);

  useEffect(() => {
    channel?.value && form.setValue("channel", channel?.value as ChannelType, { shouldValidate: true, shouldDirty: true });
    if (channel?.value) {
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
