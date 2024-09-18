import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import { InputStyle, LableStyle } from "@/constants/themeContants";
import Select from "react-select";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  createDebitEinvoice,
  createEwayBill,
  fetchDataForEwayBill,
  fetchDataForInvoice,
  fetchNoteData,
  generateEInvoice,
} from "@/features/salesmodule/salesInvoiceSlice";
import { useParams } from "react-router-dom";
import { Dayjs } from "dayjs";
import { AgGridReact } from "ag-grid-react";
import {
  columnDefs,
  docType,
  eInvoiceSchema,
  ewayBillSchema,
  subOptions,
  supplyTypeOptions,
  transactionTypeOptions,
  transportationMode,
  vehicleTypeOptions,
} from "@/constants/EwayBillConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import FullPageLoading from "@/components/shared/FullPageLoading";
import { Button } from "@/components/ui/button";
import { DatePicker, Space } from "antd";
import { toast } from "@/components/ui/use-toast";

export default function CreateEwayBill() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [totalSum, setTotalSum] = useState(0);
  const isEwayBill = window.location.href?.includes("e-way");

  const form = useForm<any>({
    resolver: zodResolver(isEwayBill ? ewayBillSchema : eInvoiceSchema),
    mode: "onBlur",
  });
  const { ewayBillData, loading } = useSelector(
    (state: RootState) => state.sellInvoice
  );
  const [rowData, setRowData] = useState(ewayBillData || []);

  const isDbNote = window.location.href?.includes("DBN");
  const isCrNote = window.location.href?.includes("CRN");
  const isCnDn =
    window.location.href?.includes("DBN") ||
    window.location.href?.includes("CRN");
  console.log(rowData, "rowData", ewayBillData);
  useEffect(() => {
    if (!isCnDn) {
      const shipId = (params?.id as string).replace(/_/g, "/");
      const action = isEwayBill ? fetchDataForEwayBill : fetchDataForInvoice;
      dispatch(action({ shipment_id: shipId })).then((res) => {
        console.log(res?.payload?.header);
        var data = res.payload?.header;
        form.setValue("invoice_id", data?.invoice_no);
        form.setValue("document_type", data?.docType);
        form.setValue("transactionType", data?.transactionType);
        form.setValue("dispatch_name", data?.bill_from_name);
        form.setValue("dispatchfrom_gstin", data?.bill_from_gst);
        form.setValue("dispatchfrom_state", data?.billing_state_name);
        form.setValue("documnet_date", data?.delivery_challan_dt);
        form.setValue("dispatchfrom_pan", data?.billing_pan);
        form.setValue("dispatchfrom_place", data?.billing_lable);
        form.setValue("dispatchfrom_pincode", data?.billing_pin);
        form.setValue("dispatchfrom_address1", data?.billingaddress1);
        form.setValue("dispatchfrom_address2", data?.billingaddress2);
        form.setValue("dispatchTo.name", data?.client);
        form.setValue("dispatchTo.state_code", data?.ship_state_name);
        form.setValue("dispatchTo.gstin", data?.client_gstno);
        form.setValue("dispatchTo.address1", data?.clientaddress1);
        form.setValue("dispatchTo.address2", data?.clientaddress2);
        form.setValue("dispatchTo.company", data?.client);
        form.setValue("dispatchTo.pincode", data?.bill_to_pin);
        form.setValue("dispatchTo.label", data?.client);
        form.setValue("shipTo_state_code", data?.ship_state_name);
        form.setValue("shipto_pincode", data?.ship_pin);
        form.setValue("shipto_name", data?.shipToName);
        form.setValue("shipto_place", data?.shipToName);
        form.setValue("shipToAddress1", data?.shippingaddress1);
        form.setValue("shipToAddress2", data?.shippingaddress2);
        form.setValue("fromPincode", data?.billing_pin);
        form.setValue("toPincode", data?.bill_to_pin);
        form.setValue("shipto_gstin", data?.client_gstno);
      });
    }
  }, [params]);

  useEffect(() => {
    setRowData(ewayBillData);
  }, [ewayBillData]);

  useEffect(() => {
    const shipmentId = (params?.id as string).replace(/_/g, "/");
    console.log(shipmentId, "idd");
    if (isCnDn) {
      dispatch(fetchNoteData({ note_no: shipmentId })).then((res) => {
        if (res.payload.success) {
          setRowData(res.payload?.data?.materials);
          const data = res.payload?.data?.header;
          form.setValue("invoice_id", data?.invoice_no);
          form.setValue("other_ref", data?.other_ref);
          form.setValue("note_id", data?.note_id);
          form.setValue("dispatch_name", data?.billfrom?.name);
          form.setValue("dispatchfrom_gstin", data?.billfrom?.gst);
          form.setValue("dispatchfrom_state", data?.billfrom?.state?.label);
          form.setValue("dispatchfrom_pan", data?.billfrom?.pan);
          form.setValue("dispatchfrom_place", data?.billfrom?.place);
          form.setValue("dispatchfrom_pincode", data?.billfrom?.pin);
          form.setValue(
            "dispatchfrom_address1",
            data?.billfrom?.billFromaddress1
          );
          form.setValue(
            "dispatchfrom_address2",
            data?.billfrom?.billFromaddress2
          );
          form.setValue("dispatchTo.name", data?.billTo?.name);
          form.setValue("dispatchTo.state_code", data?.billTo?.state?.label);
          form.setValue("dispatchTo.label", data?.billTo?.name);
          form.setValue("dispatchTo.pincode", data?.billTo?.pin);
          form.setValue("dispatchTo.gstin", data?.billTo?.gst);
          form.setValue("dispatchTo.address1", data?.billTo?.billToaddress1);
          form.setValue("dispatchTo.address2", data?.billTo?.billToaddress2);
          form.setValue("dispatchTo.company", data?.shipToName);
          form.setValue("shipto_place", data?.shipto?.place);
          form.setValue("shipto_pincode", data?.shipto?.pin);
          form.setValue("shipto_gstin", data?.shipto?.gst);
          form.setValue("shipToAddress1", data?.shipto?.shipToAddress1);
          form.setValue("shipToAddress2", data?.shipto?.shipToAddress2);
          form.setValue("fromPincode", data?.billfrom?.pin);
          form.setValue("toPincode", data?.shipto?.pin);
        }
      });
    }
  }, [params]);
  console.log(rowData);
  console.log(form.formState.errors);
  const onSubmit = (payload: any) => {
    console.log("Form data:", payload, isCnDn);
    if (isCnDn) {
      dispatch(createDebitEinvoice(payload)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast({
            title: "Data Fetched Successfully",
            className: "bg-green-600 text-white items-center",
          });
        } else {
          toast({
            title: "Failed to Fetch Data",
            className: "bg-red-600 text-white items-center",
          });
        }
      });
    } else {
      if (isEwayBill) {
        dispatch(createEwayBill(payload)).then((response) => {
          console.log(response);
          if (response.meta.requestStatus === "fulfilled") {
            toast({
              title: "Data Fetched Successfully",
              className: "bg-green-600 text-white items-center",
            });
          } else {
            toast({
              title: "Failed to Fetch Data",
              className: "bg-red-600 text-white items-center",
            });
          }
        });
      } else {
        dispatch(generateEInvoice(payload)).then((response) => {
          console.log(response);
          if (response.meta.requestStatus === "fulfilled") {
            toast({
              title: "Data Fetched Successfully",
              className: "bg-green-600 text-white items-center",
            });
          } else {
            toast({
              title: "Failed to Fetch Data",
              className: "bg-red-600 text-white items-center",
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    let sum = 0;
    rowData?.forEach((item: any) => {
      const itemValue = parseFloat(item.item_value) || 0;
      const itemSGST = parseFloat(item.item_sgst) || 0;
      const itemGSTRate = parseFloat(item.item_igst) || 0;
      const itemCGST = parseFloat(item.item_cgst) || 0;
      sum += itemValue + itemSGST + itemGSTRate + itemCGST;
    });
    setTotalSum(sum);
  }, [ewayBillData]);

  return (
    <div className="h-[calc(100vh-150px)] flex flex-col">
      {loading && <FullPageLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded p-[30px] shadow bg-[#fff] overflow-y-auto mb-10">
            <div className="text-slate-600 font-[600] text-[20px] flex justify-center">
              {isCnDn
                ? isCrNote
                  ? "Credit Note Invoice"
                  : "Debit Note Invoice"
                : isEwayBill
                ? "Create E-Way Bill"
                : "Create E-Invoice"}
            </div>

            <Card className="rounded shadow bg-[#fff] mb-8">
              <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                <h3 className="text-[17px] font-[600] text-slate-600">
                  Transaction Details
                </h3>
              </CardHeader>
              <CardContent className="mt-[30px]">
                <div className="grid grid-cols-3 gap-[40px] mt-[30px]">
                  <div>
                    <FormField
                      control={form.control}
                      name="supply_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Supply Type
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              styles={customStyles}
                              placeholder="Supply Type"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              isDisabled={false}
                              isClearable={true}
                              isSearchable={true}
                              options={supplyTypeOptions}
                              onChange={(selectedOption) => {
                                console.log(selectedOption?.value);
                                field.onChange(
                                  selectedOption ? selectedOption?.value : ""
                                );
                              }}
                              value={supplyTypeOptions.find(
                                (option) => option.value === field.value
                              )}
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
                      name="sub_supply_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Sub Type
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              styles={customStyles}
                              placeholder="Sub Type"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              isDisabled={false}
                              isClearable={true}
                              isSearchable={true}
                              options={subOptions}
                              onChange={(selectedOption) => {
                                field.onChange(
                                  selectedOption ? selectedOption?.value : ""
                                );
                              }}
                              value={subOptions.find(
                                (option) => option.value === field.value
                              )}
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
                      name="invoice_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Document No
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={InputStyle}
                              placeholder="Document No"
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
                      name="document_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Document Type
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              styles={customStyles}
                              placeholder="Document Type"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              onChange={(selectedOption) => {
                                field.onChange(
                                  selectedOption ? selectedOption.value : null
                                );
                              }}
                              isDisabled={false}
                              isClearable={true}
                              isSearchable={true}
                              options={docType}
                              value={docType.find(
                                (option) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isCnDn && (
                    <div className="">
                      <FormField
                        control={form.control}
                        name="note_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Note Id
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Document No"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  <div>
                    <FormField
                      control={form.control}
                      name="documnet_date"
                      render={() => (
                        <FormItem className="pl-[10px] w-full flex flex-col">
                          <FormLabel className={LableStyle}>
                            Document Date
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Space direction="vertical" size={12}>
                              <DatePicker
                                className="border-0 border-b-2 border-black py-[13px] w-[620px] "
                                format="DD-MM-YYYY"
                                onChange={(value: Dayjs | null) => {
                                  const formattedDate = value
                                    ? value.format("DD-MM-YYYY")
                                    : "";
                                  form.setValue("documnet_date", formattedDate);
                                }}
                              />
                            </Space>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="transactionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={LableStyle}>
                            Transaction Type
                            <span className="pl-1 text-red-500 font-bold">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              styles={customStyles}
                              placeholder="Transaction Type"
                              className="border-0 basic-single"
                              classNamePrefix="select border-0"
                              components={{ DropdownIndicator }}
                              isDisabled={false}
                              isClearable={true}
                              isSearchable={true}
                              options={transactionTypeOptions}
                              onChange={(selectedOption) => {
                                field.onChange(
                                  selectedOption ? selectedOption.value : null
                                );
                              }}
                              value={transactionTypeOptions.find(
                                (option) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isCnDn && (
                    <div className="">
                      <FormField
                        control={form.control}
                        name="other_ref"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Other Ref
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Document No"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-[30px]">
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Bill From
                  </h3>
                </CardHeader>
                <CardContent className="mt-[30px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="dispatch_name"
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
                        name="dispatchfrom_gstin"
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
                        name="dispatchfrom_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              State
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="State"
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
                        name="dispatchfrom_pan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              PAN
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="PAN"
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
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Ship From
                  </h3>
                </CardHeader>
                <CardContent className="mt-[10px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="dispatchfrom_place"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Place
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Place"
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
                        name="dispatchfrom_pincode"
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
                      name="dispatchfrom_address1"
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
                      name="dispatchfrom_address2"
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
                    Bill To
                  </h3>
                </CardHeader>

                <CardContent className="mt-[10px]">
                  <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="dispatchTo.name"
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
                        name="dispatchTo.state_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              State
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="State"
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
                        name="dispatchTo.pincode"
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
                    <div className="">
                      <FormField
                        control={form.control}
                        name="dispatchTo.gstin"
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
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="dispatchTo.address1"
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
                      name="dispatchTo.address2"
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
                    Ship To
                  </h3>
                </CardHeader>

                <CardContent className="mt-[10px]">
                  <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipto_place"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Place
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Place"
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
                        name="dispatchTo.state_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              State
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="State"
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
                        name="shipto_pincode"
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
                    <div className="">
                      <FormField
                        control={form.control}
                        name="shipto_gstin"
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
                  </div>
                  <div className="mt-[40px]">
                    <FormField
                      control={form.control}
                      name="shipToAddress1"
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
                      name="shipToAddress2"
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
                    Transportation Details
                  </h3>
                </CardHeader>
                <CardContent className="mt-[10px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="transporterId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Transporter Id
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Transporter Id"
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
                        name="transporterName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Transporter Name
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Transporter Name"
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
                        name="fromPincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              From Pincode
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="From Pincode"
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
                        name="toPincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              To Pincode
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="To Pincode"
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
                        name="transDistance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Distance (in Km)
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Distance"
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
              <Card className="rounded shadow bg-[#fff]">
                <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
                  <h3 className="text-[17px] font-[600] text-slate-600">
                    Part B
                  </h3>
                </CardHeader>
                <CardContent className="mt-[10px]">
                  <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                    <div>
                      <FormField
                        control={form.control}
                        name="transMode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Transporter Mode
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                styles={customStyles}
                                placeholder="Transporter Mode"
                                className="border-0 basic-single"
                                classNamePrefix="select border-0"
                                components={{ DropdownIndicator }}
                                isDisabled={false}
                                isClearable={true}
                                isSearchable={true}
                                options={transportationMode}
                                onChange={(selectedOption) => {
                                  field.onChange(
                                    selectedOption ? selectedOption.value : null
                                  );
                                }}
                                value={transportationMode.find(
                                  (option) => option.value === field.value
                                )}
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
                        name="vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Vehicle Type
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                styles={customStyles}
                                placeholder="Vehicle Type"
                                className="border-0 basic-single"
                                classNamePrefix="select border-0"
                                components={{ DropdownIndicator }}
                                isDisabled={false}
                                isClearable={true}
                                isSearchable={true}
                                options={vehicleTypeOptions}
                                onChange={(selectedOption) => {
                                  field.onChange(
                                    selectedOption ? selectedOption.value : null
                                  );
                                }}
                                value={vehicleTypeOptions.find(
                                  (option) => option.value === field.value
                                )}
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
                        name="vehicleNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Vehicle No.
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Vehicle No."
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
                        name="transporterDocNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={LableStyle}>
                              Transport Doc
                              {isEwayBill && (
                                <span className="pl-1 text-red-500 font-bold">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={InputStyle}
                                placeholder="Transport Doc"
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
                        name="trans_doc_date"
                        render={() => (
                          <FormItem className="pl-[10px] w-full flex flex-col">
                            <FormLabel className={LableStyle}>
                              Document Date
                              <span className="pl-1 text-red-500 font-bold">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Space direction="vertical" size={12}>
                                <DatePicker
                                  className="border-0 border-b-2 border-black py-[10px] w-[450px] "
                                  format="DD-MM-YYYY"
                                  onChange={(value: Dayjs | null) => {
                                    const formattedDate = value
                                      ? value.format("DD-MM-YYYY")
                                      : "";
                                    form.setValue(
                                      "trans_doc_date",
                                      formattedDate
                                    );
                                  }}
                                />
                              </Space>
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
            <Card className="rounded shadow bg-[#fff] mt-8">
              <CardHeader className="bg-[#e0f2f1] p-0 flex justify-between items-center px-[10px] py-[5px] w-full flex-row">
                <h3 className="text-[17px] font-[600] text-slate-600">
                  Items Details: {rowData?.length} Items
                </h3>
                <h3 className="text-[17px] font-[600] text-slate-600">
                  Total Amount: {totalSum.toFixed(2)}
                </h3>
              </CardHeader>

              <CardContent className="mt-[30px]">
                <div className="ag-theme-quartz h-[calc(100vh-140px)]">
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    suppressCellFocus={true}
                    paginationPageSize={10}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="bg-white border-t shadow border-slate-300 h-[50px] flex items-center justify-end gap-[20px] px-[20px]">
              <Button
                className="rounded-md shadow bg-green-700 hover:bg-green-600 shadow-slate-500 max-w-max px-[30px]"
                // onClick={form.handleSubmit((data) => {
                //   console.log("Form data:", data);
                //   dispatch(createEwayBill(data));
                //   // Handle form submission here
                // })}
                disabled={Object.keys(form.formState.errors).length > 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
