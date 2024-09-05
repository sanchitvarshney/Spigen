import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchProductData } from "@/features/salesmodule/createSalesOrderSlice";
import { AppDispatch, RootState } from "@/store";
import { CommandList } from "cmdk";
import { useState } from "react";
import { FaSortDown, FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { transformCurrencyData, transformOptionData } from "@/helper/transform";
import CurrencyRateDialog from "@/components/ui/CurrencyRateDialog";
const frameworks = [
  {
    value: "/",
    label: "Home",
  },
  {
    value: "/login",
    label: "Login",
  },
  {
    value: "/create-po",
    label: "Create PO",
  },
  {
    value: "/manage-po",
    label: "Manage PO",
  },
  {
    value: "/add-po",
    label: "Add PO",
  },
];

const type = [
  {
    value: "product",
    label: "Product",
  },
  {
    value: "component",
    label: "Component",
  },
];

const gstType = [
  {
    value: "I",
    label: "INTER STATE",
  },
  {
    value: "L",
    label: "INTRA STATE",
  },
];
const TextInputCellRenderer = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const { value, colDef, data, api, column, currency } = props;
  const { componentDetails } = useSelector(
    (state: RootState) => state.createSalesOrder
  );
  const [openCurrencyDialog, setOpenCurrencyDialog] = useState(false);

  const handleDelete = () => {
    const rowIndex = props.node.rowIndex;
    api.applyTransaction({
      remove: [api.getDisplayedRowAtIndex(rowIndex).data],
    });
  };
  const updateData = (newData: any) => {
    api.applyTransaction({ update: [newData] });
    api.refreshCells({ rowNodes: [props.node], columns: [column] });
  };

  const handleCurrencyChange = (value:any) => {
    data["currency"] = value
    setOpenCurrencyDialog(true);
  }

  const handleChange = (value: string) => {
    // debugger;
    const newValue = value;
    data[colDef.field] = value; // Save ID in the data
    if (colDef.field === "material") {
      dispatch(fetchProductData({ product_key: value })).then(
        (response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            const materialData = response.payload;
            data[
              "materialDescription"
            ] = ` ASIN - ${materialData?.asin}\n FNSKU -  ${materialData?.fnsku} \nFSNID - ${materialData?.fsnid} \nItem Code - ${materialData?.item_code} \nCroma Code - ${materialData?.croma_code}`;
            data["hsnCode"] = materialData?.hsn;
            updateData(data);
          }
        }
      );
    }
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    const calculation = (data.localValue * data.gstRate) / 100;
    if (data.gstType === "L") {
      // Intra-State
      cgst = calculation / 2;
      sgst = calculation / 2; // Same as CGST
      igst = 0;
      data.cgst = cgst.toFixed(2);
      data.sgst = sgst.toFixed(2);
      data.igst = igst.toFixed(2);
      console.log(cgst, igst, sgst, "ccaall");
    } else if (data.gstType === "I") {
      // Inter-State
      igst = calculation;
      cgst = 0;
      sgst = 0;
      data.cgst = cgst.toFixed(2);
      data.sgst = sgst.toFixed(2);
      data.igst = igst.toFixed(2);
    }
    // setDisplayText(text);
    data[colDef.field] = newValue; // update the data
    api.refreshCells({ rowNodes: [props.node], columns: [column] }); // refresh the cell to show the new value
    api.applyTransaction({ update: [data] });
    setOpen(false);
    updateData(data);
  };
  console.log(data, "data");
  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    data[colDef.field] = newValue; // Update the data object

    // Update localValue if the rate is changed
    if (colDef.field === "rate") {
      data["localValue"] = newValue * parseFloat(data.orderQty);
    }

    // Calculate GST based on the updated values
    const gstRate = parseFloat(data.gstRate) || 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    // Perform GST calculation only if the relevant fields are updated
    if (
      colDef.field === "rate" ||
      colDef.field === "orderQty" ||
      colDef.field === "gstRate"
    ) {
      const calculation = (data.localValue * gstRate) / 100;

      if (data.gstType === "L") {
        // Intra-State
        cgst = calculation / 2;
        sgst = calculation / 2; // Same as CGST
        igst = 0;
        data.cgst = cgst.toFixed(2);
        data.sgst = sgst.toFixed(2);
        data.igst = igst.toFixed(2);
      } else if (data.gstType === "I") {
        // Inter-State
        igst = calculation;
        cgst = 0;
        sgst = 0;
        data.cgst = cgst.toFixed(2);
        data.sgst = sgst.toFixed(2);
        data.igst = igst.toFixed(2);
      }

      // Update IGST for all cases where relevant fields change
      data["cgst"] = cgst.toFixed(2);
      data["sgst"] = sgst.toFixed(2);
      data["igst"] = igst.toFixed(2);
    }

    // Update the cell data and re-render
    api.refreshCells({ rowNodes: [props.node], columns: [column] });
    api.applyTransaction({ update: [data] });
    updateData(data);
  };
  const submitCurrencyRate = (field: string, value: any, rowId?: any) => {
    data[field] = value?.rate;
    console.log(`Updating ${field} with`, value, `for rowId ${rowId}`);
  };
  
  const renderContent = () => {
    switch (colDef.field) {
      case "delete":
        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleDelete()}
              className="text-red-500 hover:text-red-700 pt-3"
              aria-label="Delete"
            >
              <FaTrash />
            </button>
          </div>
        );
      case "material":
        return (
          <Select
            className="w-full"
            labelInValue
            filterOption={false}
            showSearch
            placeholder="Select Material"
            onSearch={(e) => props.setSearch(e)}
            options={transformOptionData(componentDetails || [])}
            onChange={(e) => handleChange(e.value)}
            value={value}
          />
        );
      case "asinNumber":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[100%] justify-between  text-slate-600 items-center  border-slate-400 shadow-none"
              >
                {value === "" ? (
                  <p className="text-slate-500 font-[400]">
                    {colDef.headerName}
                  </p>
                ) : (
                  value
                )}
                <FaSortDown className="w-5 h-5 ml-2 mb-[5px] opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0  ">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No {colDef.headerName} found.</CommandEmpty>
                <CommandList className="max-h-[400px] overflow-y-auto">
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      className="data-[disabled]:opacity-100 aria-selected:bg-cyan-600 aria-selected:text-white data-[disabled]:pointer-events-auto flex items-center gap-[10px]"
                      onSelect={(currentValue) => handleChange(currentValue)}
                    >
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      case "gstType":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[100%] justify-between  text-slate-600 items-center  border-slate-400 shadow-none"
              >
                {value
                  ? gstType.find((option) => option.value === value)?.label
                  : colDef.headerName}
                <FaSortDown className="w-5 h-5 ml-2 mb-[5px] opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0  ">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No {colDef.headerName} found.</CommandEmpty>
                <CommandList className="max-h-[400px] overflow-y-auto">
                  {gstType.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      className="data-[disabled]:opacity-100 aria-selected:bg-cyan-600 aria-selected:text-white data-[disabled]:pointer-events-auto flex items-center gap-[10px]"
                      onSelect={(currentValue) => handleChange(currentValue)}
                    >
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      case "rate":
        return (
          <>
            <Input
              onChange={handleInputChange}
              value={value}
              type="text"
              placeholder={colDef.headerName}
              className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
            />
            <Select
              className="w-1/3"
              labelInValue
              filterOption={false}
              placeholder="Currency"
              defaultValue={{ value: "364907247", label: "₹" }}
              options={transformCurrencyData(currency || [])}
              onChange={(e) => handleCurrencyChange(e.value)}
              // value={value}
            />
              <CurrencyRateDialog
              open={openCurrencyDialog}
              onClose={() => setOpenCurrencyDialog(false)}
              currency={data.currency || ""}
              price={parseFloat(data.rate) || 0}
              inputHandler={submitCurrencyRate}
              rowId={data.rowId}
            />
          </>
        );
      case "type":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[100%] justify-between  text-slate-600 items-center  border-slate-400 shadow-none"
              >
                {value || colDef.headerName}
                <FaSortDown className="w-5 h-5 ml-2 mb-[5px] opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0  ">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No {colDef.headerName} found.</CommandEmpty>
                <CommandList className="max-h-[400px] overflow-y-auto">
                  {type.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.label}
                      className="data-[disabled]:opacity-100 aria-selected:bg-cyan-600 aria-selected:text-white data-[disabled]:pointer-events-auto flex items-center gap-[10px]"
                      onSelect={(currentValue) => handleChange(currentValue)}
                      defaultValue={type[0].value}
                    >
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      case "dueDate":
        return (
          <Input
            onChange={handleInputChange}
            value={value}
            type="text"
            placeholder={colDef.headerName}
            className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
          />
        );
      case "hsnCode":
        case"remark":
        return (
          <Input
            onChange={handleInputChange}
            value={value}
            type="text"
            placeholder={colDef.headerName}
            className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
          />
        );
      case "materialDescription":
        return (
          <Input
            readOnly
            value={value}
            type="text"
            placeholder={colDef.headerName}
            className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
          />
        );
      case "localValue":
      case "foreignValue":
      case "cgst":
      case "sgst":
      case "igst":
        return (
          <Input
            readOnly
            value={value}
            type="text"
            placeholder={colDef.headerName}
            className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
          />
        );

      default:
        return (
          <Input
            onChange={handleInputChange}
            value={value}
            placeholder={colDef.headerName}
            type="number"
            className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px]"
          />
        );
    }
  };

  if (data.isNew) {
    return renderContent();
  }

  return <span>{value}</span>;
};

export default TextInputCellRenderer;
