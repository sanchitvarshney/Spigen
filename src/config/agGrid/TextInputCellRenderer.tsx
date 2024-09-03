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
  // console.log(
  //   value,
  //   "value",
  //   colDef,
  //   "colDef",
  //   data,
  //   "data",
  //   api,
  //   "api",
  //   column,
  //   "column",props.node
  // );
  const [displayText, setDisplayText] = useState(value);
  const calculateIGST = (rate: number, quantity: number, gstRate: number) => {
    return (rate * quantity * gstRate) / 100;
  };
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
  const idToTextMap = new Map(
    componentDetails?.map((item: any) => [item.id, item.text])
  );
  const handleChange = (value: string) => {
    debugger;
    const text = idToTextMap.get(value) || "";
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
          }
          updateData(data);
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
      // data.inrValue = (rate * quantity).toFixed(2);
    } else if (data.gstType === "I") {
      // Inter-State
      igst = calculation;
      cgst = 0;
      sgst = 0;
      data.cgst = cgst.toFixed(2);
      data.sgst = sgst.toFixed(2);
      data.igst = igst.toFixed(2);
      // data.inrValue = (rate * quantity).toFixed(2);
    }
    setDisplayText(text);
    data[colDef.field] = newValue; // update the data
    api.refreshCells({ rowNodes: [props.node], columns: [column] }); // refresh the cell to show the new value
    api.applyTransaction({ update: [data] });
    setOpen(false);
    updateData(data);
  };

  const handleInputChange = (e: any) => {
    // debugger
    const newValue = e.target.value;
    data[colDef.field] = newValue; // update the data
    if (colDef.field === "rate") {
      data["localValue"] = newValue * parseFloat(data.orderQty);
    }
    const rate = parseFloat(data.rate) || 0;
    const quantity = parseFloat(data.orderQty) || 1;
    const gstRate = parseFloat(data.gstRate) || 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    const calculation = (data.localValue * data.gstRate) / 100;
    console.log(calculation, "ccaall", rate, quantity, gstRate);
    if (data.gstType === "L") {
      // Intra-State
      cgst = calculation / 2;
      sgst = calculation / 2; // Same as CGST
      igst = 0;
      data.cgst = cgst.toFixed(2);
      data.sgst = sgst.toFixed(2);
      data.igst = igst.toFixed(2);
      console.log(cgst, igst, sgst, "ccaall");
      // data.inrValue = (rate * quantity).toFixed(2);
    } else if (data.gstType === "I") {
      // Inter-State
      igst = calculation;
      cgst = 0;
      sgst = 0;
      data.cgst = cgst.toFixed(2);
      data.sgst = sgst.toFixed(2);
      data.igst = igst.toFixed(2);
      // data.inrValue = (rate * quantity).toFixed(2);
    }
    if (
      colDef.field === "rate" ||
      colDef.field === "orderQty" ||
      colDef.field === "gstRate"
    ) {
      const igst = calculateIGST(rate, quantity, gstRate);
      console.log(igst, "iigsstt", rate, quantity, gstRate);
      data["cgst"] = 0;
      data["sgst"] = 0;
      data["igst"] = igst.toFixed(2); // Update the IGST field in data
    }

    api.refreshCells({ rowNodes: [props.node], columns: [column] }); // refresh the cell to show the new value
    api.applyTransaction({ update: [data] });
    updateData(data);
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[100%] justify-between text-slate-600 items-center  border-slate-400 shadow-none"
              >
                {displayText === "" ? (
                  <p className="text-slate-500 font-[400]">
                    {colDef.headerName}
                  </p>
                ) : (
                  displayText
                )}
                <FaSortDown className="w-5 h-5 ml-2 mb-[5px] opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0  ">
              <Command>
                <CommandInput
                  placeholder="Search..."
                  onChangeCapture={(e: any) => {
                    data[colDef.field] = e.target.value;
                    api.refreshCells({
                      rowNodes: [props.node],
                      columns: [column],
                    });
                    api.applyTransaction({ update: [data] });
                  }}
                  onKeyDown={(e: any) => {
                    e.key === "Enter" && setOpen(false);
                  }}
                  onValueChange={(e) => props.setSearch(e)}
                />
                <CommandEmpty>No {colDef.headerName} found.</CommandEmpty>
                <CommandList className="max-h-[400px] overflow-y-auto">
                  {componentDetails?.map((framework: any) => (
                    <CommandItem
                      key={framework.id}
                      value={framework.id}
                      className="data-[disabled]:opacity-100 aria-selected:bg-cyan-600 aria-selected:text-white data-[disabled]:pointer-events-auto flex items-center gap-[10px]"
                      onSelect={(currentValue) => handleChange(currentValue)}
                    >
                      {framework.text}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
              type="number"
              className="w-[100%]  text-slate-600  border-slate-400 shadow-none mt-[2px] mr-2"
              placeholder={colDef.headerName}
              value={value}
              onChange={handleInputChange}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[90px] justify-between  text-slate-600 items-center  border-slate-400 shadow-none px-[3px]"
                >
                  {value === "" ? (
                    <p className="text-slate-500 font-[400]">
                      {colDef.headerName}
                    </p>
                  ) : (
                    "$" // Display the currency symbol
                  )}
                  <FaSortDown className="w-5 h-5  mb-[5px] opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0  ">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandEmpty>No {colDef.headerName} found.</CommandEmpty>
                  <CommandList className="max-h-[400px] overflow-y-auto">
                    {currency.map((framework: any) => (
                      <CommandItem
                        key={framework.currency_id}
                        value={framework.currency_id}
                        className="data-[disabled]:opacity-100 aria-selected:bg-cyan-600 aria-selected:text-white data-[disabled]:pointer-events-auto flex items-center gap-[10px]"
                        onSelect={(currentValue) => handleChange(currentValue)}
                        defaultValue={currency[0]?.currency_id}
                      >
                        {framework.currency_symbol}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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

  return <span>{displayText}</span>;
};

export default TextInputCellRenderer;
