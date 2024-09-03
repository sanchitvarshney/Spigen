import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { FaFileExcel } from "react-icons/fa";
import { StatusPanelDef, ColDef, ColGroupDef } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TextInputCellRenderer from "@/config/agGrid/TextInputCellRenderer";
import DatePickerCellRenderer from "@/config/agGrid/DatePickerCellRenderer";
import StatusCellRenderer from "@/config/agGrid/StatusCellRenderer";
import styled from "styled-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddPoUIStateType } from "@/types/AddPOTypes";
import columnDefs, {
  RowData,
} from "@/config/agGrid/SalseOrderCreateTableColumns";
import AddPOPopovers from "@/components/shared/AddPOPopovers";
import { commonAgGridConfig } from "@/config/agGrid/commongridoption";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import { fetchComponentDetail } from "@/features/salesmodule/createSalesOrderSlice";
import { createSellRequest } from "@/features/salesmodule/SalesSlice";

// interface Props{
//   setTab:Dispatch<SetStateAction<string>>;
// }
const AddSalesOrder = ({
  setTab,
  payloadData,
  form,
  rowData,
  setRowData,
}: {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  payloadData: any;
  form: any;
  rowData: any;
  setRowData: any;
}) => {
  const [excelModel, setExcelModel] = useState<boolean>(false);
  const [backModel, setBackModel] = useState<boolean>(false);
  const [resetModel, setResetModel] = useState<boolean>(false);
  const [cgstTotal, setCgstTotal] = useState(0);
  const [sgstTotal, setSgstTotal] = useState(0);
  const [igstTotal, setIgstTotal] = useState(0);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { productDetails } = useSelector(
    (state: RootState) => state.createSalesOrder
  );
  const { componentDetails, currency } = useSelector(
    (state: RootState) => state.createSalesOrder
  );
  console.log(form.getValues(), "ddddddd", productDetails);

  const gridRef = useRef<AgGridReact<RowData>>(null);
  const uiState: AddPoUIStateType = {
    excelModel,
    setExcelModel,
    setRowData,
    backModel,
    setBackModel,
    resetModel,
    setResetModel,
  };

  const addNewRow = () => {
    const newRow: RowData = {
      type: "Product",
      material: "",
      materialDescription: "",
      // asinNumber: "B01N1SE4EP",
      orderQty: 1,
      // rate: 0,
      currency: "USD",
      // gstRate: 18,
      gstType: "I",
      localValue: 0.0,
      foreignValue: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      dueDate: "2024-07-25",
      // hsnCode: "123456",
      isNew: true,
    };
    setRowData((prevData: any) => [...prevData, newRow]);
  };

  useEffect(() => {
    const cgstSum = rowData.reduce(
      (sum: number, item: any) => sum + (parseFloat(item.cgst) || 0),
      0
    );
    const sgstSum = rowData.reduce(
      (sum: number, item: any) => sum + (parseFloat(item.sgst) || 0),
      0
    );
    const igstSum = rowData.reduce(
      (sum: number, item: any) => sum + (parseFloat(item.igst) || 0),
      0
    );

    setCgstTotal(cgstSum);
    setSgstTotal(sgstSum);
    setIgstTotal(igstSum);
  }, [rowData]);

  useEffect(() => {
    if (search) {
      dispatch(fetchComponentDetail({ search }));
    }
  }, [search]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      floatingFilter: false,
      editable: false,
    };
  }, []);

  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        { statusPanel: "agFilteredRowCountComponent", align: "right" },
        { statusPanel: "agSelectedRowCountComponent", align: "right" },
        { statusPanel: "agAggregationComponent", align: "right" },
      ],
    };
  }, []);

  const components = useMemo(
    () => ({
      textInputCellRenderer: (props: any) => (
        <TextInputCellRenderer
          {...props}
          componentDetails={componentDetails}
          setSearch={setSearch}
          search={search}
          currency={currency}
        />
      ),
      datePickerCellRenderer: DatePickerCellRenderer,
      statusCellRenderer: StatusCellRenderer,
    }),
    []
  );

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  useEffect(() => {
    addNewRow();
  }, []);
  // useEffect(() => {
  //   dispatch(fetchComponentDetail({ search: "" }));
  // }, []);

  const handleSubmit = () => {
    console.log("Payload Data:", payloadData); // Debugging log
    if (!payloadData || Object.keys(payloadData).length === 0) {
      console.error("Payload data is missing or undefined.");
      // Handle error, e.g., show a message to the user
      return;
    }

    try {
      dispatch(createSellRequest(payloadData));
      setTab("create");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error, e.g., show a message to the user
    }
  };

  console.log(rowData, "rowData");

  const totalSum = rowData.reduce((sum: number, item: any) => {
    // Convert rate and orderQty to numbers
    const rate = parseFloat(item.rate);
    const orderQty = item.orderQty;

    // Ensure rate and orderQty are valid numbers before multiplying
    if (!isNaN(rate) && !isNaN(orderQty)) {
      return sum + rate * orderQty;
    }
    return sum;
  }, 0);

  // Round the total sum to 2 decimal places
  const roundedTotalSum = Number(totalSum.toFixed(2));

  return (
    <Wrapper>
      <AddPOPopovers uiState={uiState} />
      <div className="h-[calc(100vh-150px)] grid grid-cols-[400px_1fr]">
        <div className="max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-gray-300 bg-white border-r flex flex-col gap-[10px] p-[10px]">
          <Card className="rounded-sm shadow-sm shadow-slate-500">
            <CardHeader className="flex flex-row items-center justify-between p-[10px] bg-[#e0f2f1]">
              <CardTitle className="font-[550] text-slate-600">
                Client Detail
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-[20px] flex flex-col gap-[10px] text-slate-600">
              <h3 className="font-[500]">Name</h3>
              <p className="text-[14px]">{form.getValues("bill_name")}</p>
              <h3 className="font-[500]">Address</h3>
              <p className="text-[14px]">
                {form.getValues("customer_address1")}{" "}
                {form.getValues("customer_address2")}
              </p>
              <h3 className="font-[500]">GSTIN</h3>
              <p className="text-[14px]">{form.getValues("customer_gstin")}</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm shadow-sm shadow-slate-500">
            <CardHeader className="flex flex-row items-center justify-between p-[10px] bg-[#e0f2f1]">
              <CardTitle className="font-[550] text-slate-600">
                Tax Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-600">
                <ul>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">
                        Sub-Total value before Taxes :
                      </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">{roundedTotalSum ?? 0.0}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">CGST :</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+){cgstTotal.toFixed(2)}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">SGST :</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+){sgstTotal.toFixed(2)}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">ISGST :</h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+){igstTotal.toFixed(2)}</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[600] text-cyan-600">
                        Sub-Total values after Taxes :
                      </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+)0.00</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="max-h-[calc(100vh-150px)] overflow-y-auto bg-white">
          <div className="flex items-center w-full gap-[20px] h-[60px] px-[10px] justify-between">
            <Button
              onClick={addNewRow}
              className="rounded-md shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500 max-w-max"
            >
              <Plus className="font-[600]" /> Add Item
            </Button>
            <div className="flex items-center gap-[20px]">
              <Button
                onClick={onBtExport}
                className="bg-[#217346] text-white hover:bg-[#2fa062] hover:text-white flex items-center gap-[10px] text-[15px] shadow shadow-slate-600 rounded-md"
              >
                <FaFileExcel className="text-white w-[20px] h-[20px]" /> Export
                to Excel
              </Button>
              <Button
                onClick={() => setExcelModel(true)}
                className="bg-[#217346] text-white hover:bg-[#2fa062] hover:text-white flex items-center gap-[10px] text-[15px] shadow shadow-slate-600 rounded-md"
              >
                <Upload className="text-white w-[20px] h-[20px]" /> Upload Excel
                Here
              </Button>
            </div>
          </div>
          <div className="ag-theme-quartz h-[calc(100vh-210px)] w-full">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs as (ColDef | ColGroupDef)[]}
              defaultColDef={defaultColDef}
              statusBar={statusBar}
              components={components}
              pagination={true}
              paginationPageSize={100}
              animateRows={true}
              gridOptions={commonAgGridConfig}
              suppressCellFocus={false}
              suppressRowClickSelection={false}
            />
          </div>
        </div>
      </div>
      <div className="bg-white border-t shadow border-slate-300 h-[50px] flex items-center justify-end gap-[20px] px-[20px]">
        <Button className="rounded-md shadow bg-red-700 hover:bg-red-600 shadow-slate-500 max-w-max px-[30px]">
          Reset
        </Button>
        <Button
          className="rounded-md shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500 max-w-max px-[30px]"
          onClick={() => setTab("create")}
        >
          Back
        </Button>
        <Button
          className="rounded-md shadow bg-green-700 hover:bg-green-600 shadow-slate-500 max-w-max px-[30px]"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ag-theme-quartz .ag-root-wrapper {
    border-radius: 0;
    border: 0;
  }
  .ag-theme-quartz .ag-cell {
    justify-content: center;
  }
`;

export default AddSalesOrder;
