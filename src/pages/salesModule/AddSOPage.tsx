import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { FaFileExcel } from "react-icons/fa";
import { RowData2 } from "@/data";
import { ColDef, StatusPanelDef } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tablecolumns } from "@/config/agGrid/tableColumns";
import TextInputCellRenderer from "@/config/agGrid/TextInputCellRenderer";
import DatePickerCellRenderer from "@/config/agGrid/DatePickerCellRenderer";
import StatusCellRenderer from "@/config/agGrid/StatusCellRenderer";
import styled from "styled-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddPoUIStateType } from "@/types/AddPOTypes";
import AddPOPopovers from "@/components/shared/AddPOPopovers";
import { log } from "console";

const AddSOPage = ({ form, setNextPage, nextPage, iscomponents }) => {
  const [rowData, setRowData] = useState<RowData2[]>([]);
  const [prevPageData, setPrevPageData] = useState();
  const [excelModel, setExcelModel] = useState<boolean>(false);
  const [backModel, setBackModel] = useState<boolean>(false);
  const [resetModel, setResetModel] = useState<boolean>(false);
  const newdata = form.getFieldsValue();

  useEffect(() => {
    if (newdata && newdata.client) {
      console.log("newdata", newdata);
      setPrevPageData(newdata);
      console.log("iscomponents", iscomponents);
      console.log("newdata?.client?.label", newdata?.client?.label);
    }
  }, [newdata]);
  console.log("newdata?.client?.label", prevPageData);
  const gridRef = useRef<AgGridReact<RowData2>>(null);
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
    const newRow: RowData2 = {
      index: 0,
      type: "",
      material: "",
      asinNumber: "",
      ordQty: 0,
      rate: 0,
      gstRate: 0,
      isNew: true,
      details: newdata,
    };
    setRowData([...rowData, newRow]);
  };

  const saveRows = (data: RowData2) => {
    const updatedData = rowData.map((row) => {
      if (row.index === data.index) {
        row.isNew = false;
      }
      return row;
    });
    setRowData(updatedData);
    console.log(updatedData);
  };
  console.log("rowData", rowData);
  const viewRow = (data: RowData2) => {
    console.log("View action", data);
    // Implement your view action here
  };

  const editRow = (data: RowData2) => {
    console.log("Edit action", data);
    const updatedData = rowData.map((row) =>
      row.index === data.index ? { ...row, isNew: true } : row
    );
    setRowData(updatedData);
  };
  console.log("next", nextPage);

  const deleteRow = (data: RowData2) => {
    console.log("Delete action", data);
    setRowData(rowData.filter((row) => row.index !== data.index));
  };
  const columnDefs: ColDef[] = useMemo(
    () => tablecolumns(viewRow, editRow, deleteRow, saveRows),
    [rowData]
  );

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: false,
      editable: false,
    };
  }, [newdata]);
  const onSubmit = async () => {
    const values = await form.validateFields();
    console.log("values", values);
  };
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
  }, [newdata]);
  const components = useMemo(
    () => ({
      textInputCellRenderer: TextInputCellRenderer,
      datePickerCellRenderer: DatePickerCellRenderer,
      statusCellRenderer: StatusCellRenderer,
    }),
    [newdata]
  );

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, [newdata]);
  // useEffect(() => {
  //   addNewRow();
  // }, []);
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
              <p className="text-[14px]">{prevPageData?.client?.label}</p>
              <h3 className="font-[500]">Address</h3>
              <p className="text-[14px]">
                {prevPageData?.clientaddress?.replaceAll("<br>", " ")}
              </p>
              <h3 className="font-[500]">GSTIN</h3>
              <p className="text-[14px]"> {prevPageData?.gstin}</p>
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
                        Sub-Total value before Taxes :{" "}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">0.00</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">CGST : </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+)0.00</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">SGST : </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+)0.00</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[500]">ISGST : </h3>
                    </div>
                    <div>
                      <p className="text-[14px]">(+)0.00</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[1fr_70px] mt-[20px]">
                    <div>
                      <h3 className="font-[600] text-cyan-600">
                        Sub-Total values after Taxes :{" "}
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
              {" "}
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
          <div className="ag-theme-quartz  h-[calc(100vh-210px)] relative  flex flex-col  border-none">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              components={components}
              statusBar={statusBar}
              ref={gridRef}
            />
          </div>
        </div>
      </div>
      <div className="bg-white border-t shadow border-slate-300 h-[50px] flex items-center justify-end gap-[20px] px-[20px]">
        <Button
          className="rounded-md shadow bg-red-700 hover:bg-red-600 shadow-slate-500 max-w-max px-[30px]"
          onClick={() => setResetModel(true)}
        >
          Reset
        </Button>
        <Button
          className="rounded-md shadow bg-cyan-700 hover:bg-cyan-600 shadow-slate-500 max-w-max px-[30px]"
          onClick={() => setNextPage(false)}
        >
          Back
        </Button>
        <Button
          className="rounded-md shadow bg-green-700 hover:bg-green-600 shadow-slate-500 max-w-max px-[30px]"
          onClick={onSubmit}
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
`;
export default AddSOPage;
