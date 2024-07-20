import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Select from "react-select";
import { customStyles } from "@/config/reactSelect/SelectColorConfig";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropdownIndicator from "@/config/reactSelect/DropdownIndicator";
import { Badge } from "@/components/ui/badge";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchBillingAddress, fetchClientAddressDetail, fetchClientDetails, fetchCountries, fetchProjectDescription, fetchStates } from "@/features/salesmodule/createSalesOrderSlice";
import { fetchBillingAddressList } from "../../features/salesmodule/createSalesOrderSlice";
import { transformCustomerData, transformOptionData, transformPlaceData } from "@/helper/transform";
import ReusableAsyncSelect from "@/components/shared/ReusableAsyncSelect";

interface OptionType {
  value: string;
  label: string;
}

const CreateSalesOrderPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<{ label: string; value: string } | null>(null);
  const [selectedCostCenter, setSelectedCostCenter] = useState<{ label: string; value: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<{ label: string; value: string } | null>(null);
  const [options, setOptions] = useState<OptionType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.createSalesOrder);
  console.log("/////////////", data);
  useEffect(() => {
    dispatch(fetchBillingAddress({ billing_code: "R26331LI" }));

    dispatch(fetchBillingAddressList({ search: "" }));
    dispatch(fetchCountries());
    dispatch(fetchStates());
  }, []);

  const handleClientCahnge = (e: any) => {
    setSelectedCustomer(e);
    dispatch(fetchClientDetails(e!.value)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setOptions([{ label: response.payload.city.name, value: response.payload.city.name }]);
        dispatch(fetchClientAddressDetail({ addressID: response.payload.addressID }));
      }
    });
  };
  const handleCostCenterChange = (e: any) => {
    setSelectedCostCenter(e);
  };
  const handleProjectIdChange = (e: any) => {
    setSelectedProjectId(e);
    dispatch(fetchProjectDescription({ project_name: e.value }));
  };
  return (
    <div className="h-[calc(100vh-150px)]">
      <div className="rounded p-[30px] shadow bg-[#fff] max-h-[calc(100vh-150px)] overflow-y-auto">
        <div className="grid grid-cols-2 gap-[30px]">
          <Card className="rounded shadow bg-[#fff]">
            <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
              <h3 className="text-[17px] font-[600] text-slate-600">Client Details</h3>
              <p className="text-slate-600 text-[13px]">Type Name or Code of the Client</p>
            </CardHeader>
            <CardContent className="mt-[30px]">
              <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                <div>
                  <ReusableAsyncSelect placeholder="Client Name" endpoint="client/getClient" transform={transformCustomerData} onChange={handleClientCahnge} value={selectedCustomer} fetchOptionWith="query" />
                </div>
                <div>
                  <Select
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    placeholder="Branch"
                    className="border-0 basic-single"
                    classNamePrefix="select border-0"
                    isDisabled={false}
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={options}
                    value={data.clientDetails ? { label: data.clientDetails.city.name, value: data.clientDetails.city.name } : null}
                  />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="GSTIN" />
                </div>
              </div>
              <div className="mt-[40px]">
                <Textarea value={data.clientAddressDetail ? data.clientAddressDetail.address : ""} className="border-0 border-b rounded-none shadow-none outline-none resize-none border-slate-600 focus-visible:ring-0" placeholder="Billing Address" />
                {/* <p>error message</p> */}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded shadow bg-[#fff]">
            <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
              <h3 className="text-[17px] font-[600] text-slate-600">SO Terms</h3>
              <p className="text-slate-600 text-[13px]">Provide SO terms and other information</p>
            </CardHeader>
            <CardContent className="mt-[10px]">
              <div className="grid grid-cols-2 gap-[40px] mt-[30px]">
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="Terms and Conditions" />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="Quotation" />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="Payment Terms" />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="Due Date (in days)" />
                </div>
                <div>
                  <div className="flex justify-end">
                    <Badge className="p-0 text-[13px] bg-transparent border-none shadow-none font-[400] max-h-max text-cyan-600 py-[3px] px-[10px] cursor-pointer hover:bg-blue-100 hover:shadow shadow-slate-500 rounded-full">Add Vendor</Badge>
                  </div>
                  <ReusableAsyncSelect placeholder="Cost Center" endpoint="backend/costCenter" transform={transformOptionData} fetchOptionWith="payload" onChange={handleCostCenterChange} value={selectedCostCenter} />
                  {/* <p>error message</p> */}
                </div>
                <div>
                  <div className="flex justify-end">
                    <Badge className="p-0 text-[13px] bg-transparent border-none shadow-none font-[400] max-h-max text-cyan-600 py-[3px] px-[10px] cursor-pointer hover:bg-blue-100 hover:shadow shadow-slate-500 rounded-full">Add Vendor</Badge>
                  </div>
                  <ReusableAsyncSelect placeholder="Project Id" endpoint="backend/poProjectName" transform={transformOptionData} onChange={handleProjectIdChange} value={selectedProjectId} fetchOptionWith="payload" />

                  {/* <p>error message</p> */}
                </div>
              </div>
              <div className="mt-[40px]">
                <Textarea
                  value={data.projectDescription ? data.projectDescription.description : ""}
                  disabled={!data.projectDescription}
                  className="border-0 border-b rounded-none shadow-none outline-none resize-none border-slate-600 focus-visible:ring-0"
                  placeholder="Project Description"
                />
                {/* <p>error message</p> */}
              </div>
              <div className="mt-[40px]">
                <Textarea className="border-0 border-b rounded-none shadow-none outline-none resize-none border-slate-600 focus-visible:ring-0" placeholder="Comments" />
                {/* <p>error message</p> */}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded shadow bg-[#fff]">
            <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
              <h3 className="text-[17px] font-[600] text-slate-600">Dispatch from</h3>
              <p className="text-slate-600 text-[13px]">Provide billing information</p>
            </CardHeader>
            <CardContent className="mt-[10px]">
              <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                <div>
                  <Select
                    styles={customStyles}
                    placeholder="Bill From Address"
                    className="border-0 basic-single"
                    classNamePrefix="select border-0"
                    components={{ DropdownIndicator }}
                    isDisabled={false}
                    isLoading={true}
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={data.billingAddressList ? transformOptionData(data.billingAddressList) : []}
                  />
                  {/* <p>error message</p> */}
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="Pan No." />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="GSTIN / UIN" />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="Pincode" />
                </div>
              </div>
              <div className="mt-[40px]">
                <Textarea className="border-0 border-b rounded-none shadow-none outline-none resize-none border-slate-600 focus-visible:ring-0" placeholder="Address" />
                {/* <p>error message</p> */}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded shadow bg-[#fff]">
            <CardHeader className=" bg-[#e0f2f1] p-0 flex justify-center px-[10px] py-[5px]">
              <h3 className="text-[17px] font-[600] text-slate-600">Ship To</h3>
              <p className="text-slate-600 text-[13px]">Provide shipping information</p>
              <Switch className="flex items-center gap-[10px]">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
                <p className="text-slate-600 text-[13px]">Same as Billing Address</p>
              </Switch>
            </CardHeader>

            <CardContent className="mt-[10px]">
              <div className="mt-[30px] grid grid-cols-2 gap-[40px]">
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0 " placeholder="Name" />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="Pan No." />
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="GSTIN / UIN" />
                </div>

                <div>
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
                    options={data.states ? transformPlaceData(data.states) : []}
                  />
                  {/* <p>error message</p> */}
                </div>
                <div className="">
                  <Input className="border-0 border-b rounded-none shadow-none border-slate-600 focus-visible:ring-0" placeholder="Pincode" />
                </div>
              </div>
              <div className="mt-[40px]">
                <Textarea className="border-0 border-b rounded-none shadow-none outline-none resize-none border-slate-600 focus-visible:ring-0" placeholder="Address" />
                {/* <p>error message</p> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="h-[50px] w-full flex justify-end items-center px-[20px] bg-white shadow-md border-t border-slate-300">
        <Link to={"/sales/order/add"} className="text-white py-[5px] flex gap-[10px] items-center bg-cyan-600 hover:bg-cyan-500 rounded shadow-md shadow-slate-500 px-[20px]">
          Next
          <FaArrowRightLong className="" />
        </Link>
      </div>
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
export default CreateSalesOrderPage;
