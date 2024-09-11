import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Select from "react-select";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { Badge } from "@/components/ui/badge";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchBillingAddress,
  fetchClientDetails,
  updateFormData,
} from "@/features/salesmodule/createSalesOrderSlice";
import {
  transformClientData,
  transformCustomerData,
  transformOptionData,
  transformPlaceData,
} from "@/helper/transform";
import ReusableAsyncSelect from "@/components/shared/ReusableAsyncSelect";
import FullPageLoading from "@/components/shared/FullPageLoading";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  InputStyle,
  LableStyle,
  primartButtonStyle,
} from "@/constants/themeContants";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createSalesFormSchema } from "@/schema/salesorder/createsalesordeschema";

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
  setPayloadData: Dispatch<SetStateAction<any>>;
  channel: any;
  setChannel: Dispatch<SetStateAction<any>>;
  data: any;
  form: any;
  handleClientChange: any;
}
type CreateSalesOrderForm = z.infer<typeof createSalesFormSchema>;
const CreateSalesOrder: React.FC<Props> = ({
  setTab,
  setPayloadData,
  channel,
  setChannel,
  data,
  form,
  handleClientChange,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateFormData(form.control._formValues));
  }, [form]);

  const handleBillingAddressChange = (e: any) => {
    form.setValue("bill_to_label", e.label, { shouldValidate: true, shouldDirty: true });
    const billingCode = e.value;
    form.setValue("bill_id", billingCode, { shouldValidate: true, shouldDirty: true });

    dispatch(fetchBillingAddress({ billing_code: billingCode })).then(
      (response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          const billingData = response.payload;
          form.setValue("billing_address1", billingData.billing_address1, { shouldValidate: true, shouldDirty: true });
          form.setValue("billing_address2", billingData.billing_address2, { shouldValidate: true, shouldDirty: true });
          form.setValue("bill_from_gst", billingData.gstin, { shouldValidate: true, shouldDirty: true });
          form.setValue("bill_pan", billingData.pan, { shouldValidate: true, shouldDirty: true });
        }
      }
    );
  };

  const { clientAddressDetail } = useSelector(
    (state: RootState) => state.createSalesOrder
  );
  console.log(clientAddressDetail, "clientDetails");
  // Handler for the "Same as Client Address" checkbox
  const handleSameAsClientAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      form.setValue("isSameClientAdd", "Y");
      form.setValue("shipping_id", form.getValues("bill_name"), { shouldValidate: true, shouldDirty: true });
      form.setValue("shipping_pan", "", { shouldValidate: true, shouldDirty: true });
      form.setValue("shipping_pinCode", "", { shouldValidate: true, shouldDirty: true });
      form.setValue("shipping_gstin", form.getValues("customer_gstin"), { shouldValidate: true, shouldDirty: true });
      // form.setValue("shipping_state", form.getValues("place_of_supply"));
      form.setValue("shipping_address1", form.getValues("customer_address1"), { shouldValidate: true, shouldDirty: true });
      form.setValue("shipping_address2", form.getValues("customer_address2"), { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleClientSelected = (e: any) => {
    form.setValue("bill_name", e.label, { shouldValidate: true, shouldDirty: true });
    const bill_to_name = e.value;
    form.setValue("customer", bill_to_name, { shouldValidate: true, shouldDirty: true });

    dispatch(fetchClientDetails(bill_to_name)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        const data = response.payload[0];
        form.setValue("customer", data.clientCode, { shouldValidate: true, shouldDirty: true });
        form.setValue("customer_branch",({
          label: data?.label || "",
          value: data?.addressID || ""
        }), { shouldValidate: true, shouldDirty: true });
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
        form.setValue("isSameClientAdd", "N");
      }
    });
  };
  console.log(form.getValues());

  const onSubmit = (data: CreateSalesOrderForm) => {
    console.log("Submitted Data from CreateSalesOrder:", data); // Debugging log
    if (data) {
      setPayloadData(data);
      setTab("add"); // Switch to AddSalesOrder tab
    } else {
      console.error("Data is null or undefined");
    }
  };

  console.log(form.errors, "er");
  return (
    <div className="h-[calc(100vh-150px)]">
      {data.loading && <FullPageLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded p-[30px] shadow bg-[#fff] max-h-[calc(100vh-150px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-[30px]">
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Channel Details
                  </h3>
                  <p className="text-slate-600 text-[13px]">
                    Provide the Channel Details
                  </p>
                </CardHeader>
                <CardContent className="mt-[30px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div>
                      <FormField
                        control={form.control}
                        name="channel"
                        render={() => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Channel
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <ReusableAsyncSelect
                                placeholder="Channel Name"
                                endpoint="channel/getChannel"
                                transform={transformCustomerData}
                                onChange={setChannel}
                                value={channel}
                                fetchOptionWith="query"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {channel?.value === "AMZ" ||
                    channel === "AMZ" ||
                    channel === "AMZ_IMP" ||
                    channel?.value === "AMZ_IMP" ? (
                      <>
                        <div className="">
                          <FormField
                            control={form.control}
                            name="amz_fba_ship_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LableStyle}>
                                  FBA Shipment Id
                                  <span className="pl-1 text-red-500 font-bold">
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className={InputStyle}
                                    placeholder="FBA Shipment Id"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="">
                          <FormField
                            control={form.control}
                            name="amz_fba_app"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LableStyle}>
                                  FBA Appointment Id
                                  <span className="pl-1 text-red-500 font-bold">
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className={InputStyle}
                                    placeholder="FBA Appointment Id"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="">
                          <FormField
                            control={form.control}
                            name="amz_hawb"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LableStyle}>
                                  HAWB Number
                                  <span className="pl-1 text-red-500 font-bold">
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className={InputStyle}
                                    placeholder="HAWB Number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    ) : channel?.value === "FLK" || channel === "FLK" ? (
                      <div className="">
                        <FormField
                          control={form.control}
                          name="flk_consg_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={LableStyle}>
                                Consignment Id
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={InputStyle}
                                  placeholder="Consignment Id"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : channel?.value === "FLK_VC" || channel === "FLK_VC" ? (
                      <div className="">
                        <FormField
                          control={form.control}
                          name="po_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={LableStyle}>
                                PO Number
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={InputStyle}
                                  placeholder="PO Number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : channel?.value === "BLK" || channel === "BLK" ? (
                      <>
                        <div className="">
                          <FormField
                            control={form.control}
                            name="po_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LableStyle}>
                                  PO Number
                                  <span className="pl-1 text-red-500 font-bold">
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className={InputStyle}
                                    placeholder="PO Number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="">
                          <FormField
                            control={form.control}
                            name="blkt_vendor_code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LableStyle}>
                                  Vendor Code
                                  <span className="pl-1 text-red-500 font-bold">
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className={InputStyle}
                                    placeholder="Vendor Code"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    ) : channel?.value === "CROMA" || channel === "CROMA" ? (
                      <div className="">
                        <FormField
                          control={form.control}
                          name="po_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={LableStyle}>
                                PO Number
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={InputStyle}
                                  placeholder="PO Number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : channel?.value === "B2B" || channel === "B2B" ? (
                      <div className="">
                        <FormField
                          control={form.control}
                          name="b2b_order_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={LableStyle}>
                                Order Id
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={InputStyle}
                                  placeholder="Order Id"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Bill to Details
                  </h3>
                  <p className="text-slate-600 text-[13px]">
                    Provide Bill to information
                  </p>
                </CardHeader>
                <CardContent className="mt-[30px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div>
                      <div className="flex justify-end">
                        <Badge className="p-0 text-[13px] bg-transparent border-none shadow-none font-[400] max-h-max text-cyan-600 py-[3px] px-[10px] cursor-pointer hover:bg-blue-100 hover:shadow shadow-slate-500 rounded-full">
                          Add Bill to details
                        </Badge>
                      </div>
                      <FormField
                        control={form.control}
                        name="customer"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Name
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Select
                                styles={customStyles}
                                placeholder="Name"
                                className="border-0 basic-single"
                                classNamePrefix="select border-0"
                                components={{ DropdownIndicator }}
                                onChange={handleClientSelected}
                                isDisabled={false}
                                isClearable={true}
                                isSearchable={true}
                                options={
                                  Array.isArray(data.client)
                                    ? transformCustomerData(data.client) // Handle the case when data.client is already an array
                                    : data.client
                                    ? transformCustomerData([data.client]) // Wrap single object into an array
                                    : [] // Fallback to empty array if data.client is null or undefined
                                }
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {channel?.value !== "BLK" && channel?.value !== "B2B" && channel!=="BLK" && channel!=="B2B" && (
                      <div>
                        <div className="flex justify-end">
                          <Badge className="p-0 text-[13px] bg-transparent border-none shadow-none font-[400] max-h-max text-cyan-600 py-[3px] px-[10px] cursor-pointer hover:bg-blue-100 hover:shadow shadow-slate-500 rounded-full">
                            Add Branch
                          </Badge>
                        </div>

                        <FormField
                          control={form.control}
                          name="customer_branch"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={LableStyle}>
                                {channel?.value == "FLK"
                                  ? "Warehouse"
                                  : channel?.value == "FLK_VC"
                                  ? "FC Code"
                                  : channel?.value == "CROMA"
                                  ? "DC"
                                  : "Label"}
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Select
                                  styles={customStyles}
                                  placeholder={
                                    channel?.value == "FLK"
                                      ? "Warehouse"
                                      : channel?.value == "FLK_VC"
                                      ? "FC Code"
                                      : channel?.value == "CROMA"
                                      ? "DC"
                                      : "Label"
                                  }
                                  className="border-0 basic-single"
                                  classNamePrefix="select border-0"
                                  components={{ DropdownIndicator }}
                                  onChange={handleClientChange}
                                  isDisabled={false}
                                  isClearable={true}
                                  isSearchable={true}
                                  options={
                                    data.clientDetails
                                      ? transformClientData(data.clientDetails)
                                      : []
                                  }
                                  // value={
                                  //   data.clientDetails
                                  //     ? transformClientData(data.clientDetails).find(option => option.value === form.getValues("customer_branch"))
                                  //     : null
                                  // }
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    <div className="">
                      <FormField
                        control={form.control}
                        name="customer_gstin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              GSTIN
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="GSTIN"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="place_of_supply"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              State of Supply
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="State of Supply"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="customer_address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 1
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
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

                    {/* <p>error message</p> */}
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="customer_address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 2
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
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

                    {/* <p>error message</p> */}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Bill From Details
                  </h3>
                  <p className="text-slate-600 text-[13px]">
                    Provide Bill From information
                  </p>
                </CardHeader>
                <CardContent className="mt-[10px]">
                  <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                    <div>
                      <FormField
                        control={form.control}
                        name="bill_id"
                        render={({  field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Billing Name
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Select
                                styles={customStyles}
                                placeholder="Bill From Address"
                                className="border-0 basic-single"
                                classNamePrefix="select border-0"
                                components={{ DropdownIndicator }}
                                onChange={handleBillingAddressChange}
                                isDisabled={false}
                                isClearable={true}
                                isSearchable={true}
                                options={
                                  data?.billingAddressList
                                    ? transformOptionData(
                                        data?.billingAddressList
                                      )
                                    : []
                                }
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* <p>error message</p> */}
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="bill_pan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Pan No.
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Pan No."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="bill_from_gst"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              GSTIN / UIN
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="GSTIN / UIN"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="billing_address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 1
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
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
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="billing_address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 2
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
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
                </CardContent>
              </Card>

              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Ship To
                  </h3>
                  <p className="text-slate-600 text-[13px]">
                    Provide shipping information
                  </p>
                  <Switch className="flex items-center gap-[10px]">
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={handleSameAsClientAddressChange}
                        value={form.getValues("isSameClientAdd")}
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-slate-600 text-[13px]">
                      Same as Client Address
                    </p>
                  </Switch>
                </CardHeader>

                <CardContent className="mt-[10px]">
                  <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipping_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Name
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipping_pan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Pan No
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Pan No."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipping_gstin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              GSTIN / UIN
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="GSTIN / UIN"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="shipping_state"
                        render={() => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              State
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Select
                                styles={customStyles}
                                placeholder="State"
                                className="border-0 basic-single"
                                classNamePrefix="select border-0"
                                components={{ DropdownIndicator }}
                                isDisabled={false}
                                isLoading={true}
                                isClearable={true}
                                isSearchable={true}
                                name="color"
                                options={
                                  data.states
                                    ? transformPlaceData(data.states)
                                    : []
                                }
                                onChange={(e: any) =>
                                  form.setValue("shipping_state", e.value)
                                }
                                value={form.getValues("shipping_state")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* <p>error message</p> */}
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipping_pinCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Pincode
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Pincode"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="shipping_address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 1
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={InputStyle}
                              placeholder="Address line 1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="shipping_address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Address Line 2
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={InputStyle}
                              placeholder="Address line 2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    SO Terms
                  </h3>
                  <p className="text-slate-600 text-[13px]">
                    Provide SO terms and other information
                  </p>
                </CardHeader>
                <CardContent className="mt-[10px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="terms_condition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Terms and Conditions
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Terms and Conditions"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="quotation_detail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Quotation
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Quotation"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="payment_term"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Payment Terms
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Payment Terms"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="due_day"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Due Date (in days)
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Due Date (in days)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="h-[50px] w-full flex justify-end items-center px-[20px] bg-white shadow-md border-t border-slate-300">
            <Button
              onClick={() => {
                //   setTab("add");
                dispatch(updateFormData(form.control._formValues));
              }}
              className={`${primartButtonStyle} flex gap-[10px]`}
              type="submit"
              disabled={form.errors}
            >
              Next
              <FaArrowRightLong className="" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
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
export default CreateSalesOrder;
